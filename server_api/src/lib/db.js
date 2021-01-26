const mongoose = require('mongoose')

const url = 'mongodb+srv://verox:ra8uq55F9m0Y4S7T@decimag.3cng6.mongodb.net/devto'

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports= {
  connect
}