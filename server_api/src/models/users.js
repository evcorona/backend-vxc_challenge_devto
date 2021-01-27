const mongoose = require('mongoose')

//La validacion estara en el frontend
//De este lado se guardan los valores encriptados
const schema = new mongoose.Schema({
  username: {
    type: String,
   // pattern: /^[a-z0-9_-]{3,15}$/,
   // minlength: 4,
   // maxlength: 10,
    required: true
  },
  email: {
    type: String,
    pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  password: { //cadena encriptada
    type: String,
    required: true
  }
})

//Exportando un valor = Modelo representado con una constante que inicia con mayus
module.exports = mongoose.model('users', schema)

//username,email,password