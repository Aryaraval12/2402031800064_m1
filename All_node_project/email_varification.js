const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aryaraval1746@gmail.com",
    pass: "pkna utfe rgni zskq"
  }
});

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;
  // ADD MESSAGE TO TEXT
   
//otp generating function
function generateotp(){
    const otp = crypto.randomInt(1000, 9999);
    fotp = parseInt(otp);
    return fotp;
}
var otp = 0
    otp = generateotp();
    console.log("Your four digit OTP is: " ,otp);
 var message = `Your OTP is: ${otp}`;
 console.log(message);
  const mailOptions = {
    from: "aryaraval1746@gmail.com",
    to,
    subject,
    text : message
  };
    
console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
