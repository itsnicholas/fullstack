require('dotenv').config()
const logger = require('./utils/logger')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app