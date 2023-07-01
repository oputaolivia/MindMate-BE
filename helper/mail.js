const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { template } = require("handlebars/runtime");
const User = require("../model/userModel");
require("dotenv").config();

const sendMail = (userEmail, subject, payload, template)=>{
    try{
      const transporter = nodemailer.createTransport({
        host: "smtp.titan.email",
        port: 465,
        secure: true,
        auth:{
          user: process.env.bossMail,
          pass: process.env.MAIL_PASS
        }
      });
  
      const source = fs.readFileSync(path.join(__dirname, template), "utf8");
      const compiledTemplate = handlebars.compile(source);
     let mailOptions = {
        from: process.env.bossMail,
        to: userEmail ,
        subject: subject,
        html: compiledTemplate(payload),
      };
  
     transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }catch(err){
      return err;
    }
  }

  module.exports ={
    sendMail,
  }