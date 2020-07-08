const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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

test('invalid users sshould not be accepted', async () => {
  const newUser1 = {
    username: "22",
    name: "Yeah22",
    password: "1234532"
  }

  await api
    .post('/api/blogs')
    .send(newUser1)
    .expect(400)

})

describe('invalid users are not created', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('username exists already', async () => {

    const newUser = {
      username: "root",
      password: "12345"
    }

    await api
      .post('/api/blogs')
      .send(newUser)
      .expect(400)

  })

  test('username is too short', async () => {

    const newUser = {
      username: "ro",
      password: "12345"
    }

    await api
      .post('/api/blogs')
      .send(newUser)
      .expect(400)

  })

  test('password is too short', async () => {

    const newUser = {
      username: "roott",
      password: "12"
    }

    await api
      .post('/api/blogs')
      .send(newUser)
      .expect(400)

  })
})

afterAll(() => {
  mongoose.connection.close()
})