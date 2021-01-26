//Importando el export del documento de modelo
const Posts = require('./../models/posts')

function getPosts() {
  return Posts.find({})
}

function getPostById(id) {
  return Posts.findById(id) 
} 

function createPosts(title, username, date, tags, content, URL){
  return Posts.create({title, username, date, tags, content, URL})
}

module.exports = {
  getPosts,
  getPostById,
  createPosts
}

// title, username, date, tags, content, URL