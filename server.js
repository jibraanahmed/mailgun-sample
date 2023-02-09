const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
require('dotenv').config();



const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/views/template.ejs"), "utf8")

const mailgunAuth = {
  auth: {
    api_key: process.env.apiKey,
    domain: process.env.domain
  }
}

const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))

const template = handlebars.compile(emailTemplateSource)

const htmlToSend = template({message: "Hello!"})

const mailOptions = {
  from: "email",
  to: "email",
  subject: "Testing, Hello World",
  html: htmlToSend
}

smtpTransport.sendMail(mailOptions, function(error, response) {
  if (error) {
    console.log(error)
  } else {
    console.log("Successfully sent email.")
  }
})