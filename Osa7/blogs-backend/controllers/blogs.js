const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
//const Comment = require('../models/comment')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    //.populate('comments', { content: 1 })

  response.json(blogs)
})

router.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }

  await blog.remove()
  user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body
  console.log('blog in blog put', blog)
  console.log('request.params.id in blog put', request.params.id)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  console.log('updatedBlog in blog put', updatedBlog)
  response.json(updatedBlog.toJSON())
})

router.post('/:id/comments', async (request, response) => {
  const comment = request.body.content
  console.log('comment in comment add', comment)

  if (!comment) {
    return response.status(400).send({ error: 'content missing' })
  }

  if (!request.params.id) {
    return response.status(401).json({ error: 'id missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  console.log('blog in comment add', blog)


  blog.comments = blog.comments.concat(comment)
  console.log('blog.comments in comment add', blog.comments)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201).json(updatedBlog)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

module.exports = router