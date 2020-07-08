const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have an id', async () => {
  const response = await api.get('/api/blogs')
  response.body.map((blog) => expect(blog.id).toBeDefined())
})

test('post new blog and is it there', async () => {
  const newBlog = {
    title: "A new one", 
    author: "A person", 
    url: "https://somestuff/", 
    likes: 1, 
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('A new one')

})

test('post new blog and see if likes are zero', async () => {
  const newBlog = {
    title: "A second one", 
    author: "A second person", 
    url: "https://somestuff2/", 
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    blogsAtEnd.map((blog) => expect(blog.likes).toBeGreaterThanOrEqual(0))
})

test('post new blog without title and url, and expect error', async () => {
  const newBlog = {
    author: "A third person" 
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})