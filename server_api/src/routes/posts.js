const express = require('express')
const posts = require('./../usecases/posts')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()

router.get('/', authMiddleware, async (request, response) => {
  const allPosts = await posts.getPosts()

  response.json({
    success: true,
    message: 'Todos los Post',
    data: allPosts
  })
})

router.get('/:id', async (request, response) => {
  const postById = await posts.getPostById(request.params.id)

  response.json({
    success: true,
    message: 'Post Único',
    data: postById
  })
})

router.post('/', async (request, response) => {
  const { title, username, datetime, tags, content, URL } = request.body
  const PostCreated = await posts.createPosts(title, username, datetime, tags, content, URL)

  response.json({
    success: true,
    message: 'Post Creado',
    data: PostCreated
  })
})

module.exports = router

// title, username, date, tags, content, URL