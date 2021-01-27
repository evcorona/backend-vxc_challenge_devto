const cors = require('cors')
const express = require('express')
const postsRouter = require('./routes/posts')
const authRouter = require('./routes/auth')

const server = express()

server.use(cors())
server.use(express.json()) //Middleware

server.use('/posts',postsRouter)
server.use('/auth',authRouter)

server.get('/', (request,response) => {
  response.json({
    sucess: true,
    message: 'devtoAPI.vxcrown'
  })
})

module.exports = server
