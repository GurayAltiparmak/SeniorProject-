require('dotenv').config()
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User')
const nodemailer = require('nodemailer');

const { isEmailVerified } = require('./emailVerified')



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "fotodietnutrionandtraining@gmail.com",
        pass: "hxxk dqoz otlc brth"
    }
})
//Boy Kilo bilgisi postlama 
router.post('/update-measurements', async (req, res) => {
    try {
        const { kilo, boy } = req.body;

        if (!kilo || !boy) {
            // Kullanıcı kilo veya boy bilgisini göndermemişse, varsayılan olarak 0 olarak ayarla
            kilo = 0;
            boy = 0;
            console.log('Kullanıcı kilo veya boy bilgisi göndermedi, varsayılan değerler kullanılacak.');
        }

        const user = req.user; // Auth ile oturum açmış kullanıcıyı al

        // Kullanıcının kilo ve boy bilgilerini güncelle
        user.kilo = kilo;
        user.boy = boy;
        await user.save();

        res.status(200).json({ success: true, message: 'Measurements updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Kilo Boy bilgisi çekme

router.get('/get-measurements', async (req, res) => {
    try {
        const user = req.user; // Auth ile oturum açmış kullanıcıyı al

        // Kullanıcının kilo ve boy bilgilerini al
        const kilo = user.kilo;
        const boy = user.boy;

        res.status(200).json({ success: true, kilo, boy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post("/register", async (req, res) => {
    try {
        const { fullname, username, password } = req.body;

        const exitingUser = await User.findOne({ username });

        if (exitingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ fullname, username, kilo:0, boy:0 });

        User.register(newUser, password, async (err, user) => {
            if (err) {
                console.error('Error registering user: ', err);
                return res.status(500).json({ error: 'Failed to register user' });
            }

            const verificationToken = generateToken();

            user.verificationToken = verificationToken;
            await user.save();

            sendVerificationEmail(username, verificationToken);

            res.status(201).json({ success: true, message: ' User registered successfully. Please check your email for verification.' });

        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/verify/:verificationToken', async (req, res) => {
    try {
        const { verificationToken } = req.params;

        const user = await User.findOne({ verificationToken })

        if (!user) {
            return res.status(404).json({ error: 'Invalid verification token' });
        }

        user.verified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

function generateToken() {
    return Math.random().toString(36).substr(2);
}

function sendVerificationEmail(email, verificationToken) {
    const verificationLink = `http://192.168.1.102:3000/verify/${verificationToken}`

    const mailOptions = {
        from: "fotodietnutrionandtraining@gmail.com",
        to: email,
        subject: "Email Verification",
        text: `Please click on the following link to verify your email: ${verificationLink}`,
        html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email. </p>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending verification email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    })
}

router.post('/login', isEmailVerified, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }

        if (!user) {
            return res.json({ success: false, message: 'Authentication failed' });

        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ success: false, error: loginErr.message })
            }

            return res.json({ success: true, user })
        })
    })(req, res, next)
})

router.get('/check-auth', (req, res) => {
    // console.log("User authentication", req.user)
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.json({ authenticated: false, user: null });
    }
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    })
})


module.exports = router;