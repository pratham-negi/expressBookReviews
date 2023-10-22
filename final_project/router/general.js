const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password){
      return res.send("invalid !!");
  }
  if(!isValid){
      return res.send("invalid !! ")
  }
  users.push({'username':username, 'password':password })
  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 
  return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  return res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const val = []
    for(i in books){
        let book = books[i];
        if(book.author == author){
        val.push(book);
        }
    }

    return res.send(val);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const val = []
    for(i in books){
        let book = books[i];
        if(book.title == title){
        val.push(book);
        }
    }

    return res.send(val);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    return res.send(books[isbn].reviews);
});

module.exports.general = public_users;
