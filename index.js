require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Statik dosyaları sun
app.use(express.static(path.join(__dirname, 'build'))); // 'build' dizini varsa

// Herhangi bir route için index.html'i döndür
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); // 'build/index.html' dosyası
});

// POST endpoint for registration
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, whatsapp } = req.body;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Gmail kullanıyorsanız
        auth: {
            user: process.env.EMAIL, // .env'den gelen e-posta adresi
            pass: process.env.EMAIL_PASSWORD // .env'den gelen e-posta şifresi
        }
    });

    // E-posta içeriği
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL, // Kendi e-posta adresiniz
        subject: 'Yeni Qeydiyyat',
        text: `Ad: ${firstName}\nSoyad: ${lastName}\nE-poçt: ${email}\nWhatsApp: ${whatsapp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Qeydiyyat məlumatları göndərildi.' });
    } catch (error) {
        res.status(500).json({ message: 'Xəta baş verdi. Yenidən cəhd edin.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda işləyir.`);
});
