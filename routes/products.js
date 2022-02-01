const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const uuid = require("uuid").v4;
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const fetch = require("node-fetch");
const { requireAuth, blockUnAuth } = require("../middleware/authMiddleware");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "xxxxxx",
  signatureVersion: "xx",
});

const s3 = new aws.S3();

const app = express();

let fileName = "";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../fontend/public");
//   },
//   filename: (req, file, cb) => {
//     fileName = `${uuid()}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });

//upload.array("file"),

//const upload = multer({ storage });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "xxxxxxxxxxxxxx",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      fileName = `${uuid()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

app.post("/verify_cpatcha", async (req, res) => {
  console.log(`token in route post is: ${req.body.token}`);
  if (!req.body.token) {
    console.log("it goes inside");
    return res.json({ success: false, msg: "Please select captcha" });
  }

  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body.token}`;

  // Make a request to verifyURL
  const body = await fetch(verifyURL).then((res) => res.json());

  // If not successful
  if (body.success !== undefined && !body.success) {
    return res.json({ success: false, msg: "Failed captcha verification" });
  }

  return res.json({ success: true, msg: "Captcha passed!" });
});

app.post("/add", blockUnAuth, upload.single("file"), async (req, res) => {
  console.log("it is: " + req.body.name);
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    qty: req.body.qty,
    image: fileName,
  });
  console.log("route in server\n");
  console.log(newProduct);
  newProduct
    .save()
    .then(res.status(200).json({ success: true, msg: "Data saved!" }))
    .catch((err) => {
      console.log(err);
    });


});


app.get("/images/:key", async (req, res) => {
  const key = req.params.key;
  console.log(key);

  const params = { Bucket: "xxxxxxxxxxxxxx", Key: key };

  const url = await s3.getSignedUrl("getObject", params);
  //console.log(url);
  res.send(JSON.stringify(url));


});

app.get("/", requireAuth, async (req, res) => {
  try {
    if(res.locals.user){
      console.log(res.locals.user.name);
    }
    const productList = await Product.find();
    res.status(200).json(productList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = app;
