const express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
//Mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = process.env.PORT || 9000;

// middleware
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// endpoints

MongoClient.connect(process.env.MONGODB_URI).then((client) => {
  console.log("Connected to MongoDB");
  const db = client.db("palabrasrandom");
  const wordsCollection = db.collection("words");

  let sampleSize = 3;

  app.get("/", (req, res) => {
    db.collection("words")
      .aggregate([{ $sample: { size: +sampleSize } }])
      .toArray()
      .then((results) => {
        res.render("index", { words: results });
      })
      .catch((error) => console.error(error));
  });

  app.post("/refresh", (req, res) => {
    if (sampleSize != req.body.ammount) {
      sampleSize = req.body.ammount;
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});

// Nodemailer (Report Form)

app.post("/report", function (req, res) {
  let data = req.body.reportedWord;

  const msg = {
    to: "palabrasrandomweb@gmail.com",
    from: "support@palabrasrandom.com",
    subject: "Informe de Palabra: " + data,
    text: "Se ha informado de la palabra: " + data,
    html: "Se ha informado de la palabra: " + data,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
      const { message, code, response } = error;
      const { headers, body } = response;
    });
});

app.listen(port, () => console.log("server listening on port", port));
