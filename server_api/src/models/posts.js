const mongoose = require('mongoose')

//Creacion de esquema, nos refleja la manera en que estan los datos (objetos)
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  username: {
    type: String,
    trim: true,
    required: true
  },
  datetime: {
    type: Date, 
    required: true
  },
  tags: {
    type: String,
    trim: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  URL: {
    type: String,
    trim: true,
    required: true
  }
})

//Modelo representado con una constante que inicia con mayus
const model = mongoose.model('posts', schema)

//Exportando un valor
module.exports = model

//title, username, date, tags, content, URL
