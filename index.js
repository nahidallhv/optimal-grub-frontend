require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build"))); 


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")); 
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, whatsapp } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL, 
    subject: "Yeni Qeydiyyat",
    text: `Ad: ${firstName}\nSoyad: ${lastName}\nE-poçt: ${email}\nWhatsApp: ${whatsapp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Qeydiyyat məlumatları göndərildi." });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi. Yenidən cəhd edin." });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir.`);
});
