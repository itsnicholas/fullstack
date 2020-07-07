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

afterAll(() => {
  mongoose.connection.close()
})