const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies['json-web-token'];

  // check json web token exists & is verified
  if (token) {
      console.log("there is a json web token:");


    jwt.verify(token, 'xxxxxxxxx', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log("Logged In");
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    //res.redirect('/login');
    console.log("No web token detected!");
    res.locals.user = null;
    next()
  }
};

const blockUnAuth = (req, res, next) => {
    const token = req.cookies['json-web-token'];
  
    // check json web token exists & is verified
    if (token) {
        console.log("there is a json web token:");
  
  
      jwt.verify(token, 'xxxxxxxxx', async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.locals.user = null;
         
        } else {
          console.log("Logged In");
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      //res.redirect('/login');
      console.log("No web token detected!");
      res.locals.user = null;
      //res.redirect('http://localhost:3000/Login');
    }
  };

module.exports = { requireAuth, blockUnAuth };