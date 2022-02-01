const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 12*60*60;

const createToken = (id) => {
  return jwt.sign({id}, "xxxxxxxxx", {
    expiresIn: maxAge
  });
}


//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(xx);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      usertype: req.body.usertype,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    //creating the JWT and sending it in a cookie
    const token = createToken(user._id);
    res.cookie('json-web-token', token, {httpOnly: true, secure: true, sameSite:'None', maxAge:maxAge*1000});

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {

      res.status(400).json("Wrong credentials!");
      return
      
    }

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      res.status(400).json("Wrong credentials!");
    } 

    const { password, ...others } = user._doc;

    //creating the JWT and sending it in a cookie
    if (validated) {

      const token = createToken(user._id);
      res.cookie('json-web-token', token, {httpOnly: true, maxAge:maxAge*1000});

      res.status(200).json(others);
      
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
