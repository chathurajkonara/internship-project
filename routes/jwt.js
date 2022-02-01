const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const app = express();

app.get("/", requireAuth,  (req, res) => {
    try {
      if(res.locals.user){
        console.log(res.locals.user.name);
        const user = res.locals.user;
        res.status(200).json(user);
      }
      else{
        res.status(200).json({"name":null});
      }
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  app.post("/logout", requireAuth,  (req, res) => {
    try {
        res.cookie('json-web-token', '', {maxAge:1 ,secure: true, sameSite:'none'});
        res.status(200).json("Logout Success!");
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = app;