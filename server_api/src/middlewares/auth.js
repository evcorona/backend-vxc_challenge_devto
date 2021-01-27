const jwt = require('jsonwebtoken')

function auth(request, response, next) {
  try {
    const token = request.headers.authorization
    if (!token) {
      throw new Error('Token required')
    }

    const payloadDecoded = jwt.verify(token, process.env.JWT_SECRET) 
    if (!payloadDecoded) {
      throw new Error('Invalid token')
    }

    next()
  } catch (error) {
    response.status(401)
    response.json({
      sucess: false,
      message: error.message
    })
    return
  }
}

module.exports = auth