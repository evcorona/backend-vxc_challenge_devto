//Importando el export del documento de modelo
const Users = require('./../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function signup(username, email, password) {
  const passwordEncripted = await bcrypt.hash(password, 10)
  return Users.create({ username, email, password: passwordEncripted })
}

async function login(email, password) {
  const userFound = await Users.findOne({ email: email })
  if (!userFound) throw new Error('Invalid data')

  const isPasswordValid = await bcrypt.compare(password, userFound.password)
  if (!isPasswordValid) throw new Error('Invalid data')

  const token = jwt.sign({ id: userFound._id, username: userFound.username}, process.env.JWT_SECRET) 

  return token
}

module.exports = {
  signup,
  login
}