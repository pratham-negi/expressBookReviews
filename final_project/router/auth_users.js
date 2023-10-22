const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username" : "Pratham" , "password" : "123456"}];

const isValid = (username)=>{ 
    if(!username){
        return false;
    }else{
        for(i in users){
            if(i.username == username){
                return false;
            }

            return true;
        }
    }
}

const authenticatedUser = (username,password)=>{
    for(i in  users){
        if(i.username == username){
            if(i.password == password){
                return true;
            }else{
                return false;
            }
        }
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        return res.send("invalid !!");
    }
    if(authenticatedUser){return res.status(200).json({message: true});}
  return res.send("invalid !! ")
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
