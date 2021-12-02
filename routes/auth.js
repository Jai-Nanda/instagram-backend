const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../password');
const protect = require('../middleware/protect')
router.get('/', (req, res) => {
    res.send('Hello from the other side');
});


router.get('/protected', protect, (req, res) => {
    res.send('protected route');
}
);


router.post('/SignUp', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({
            error: 'Please add all the fields'
        });
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (savedUser) {
                return res.status(422).json({
                    error: 'Email is already in use'
                });
            }
            bcrypt.hash(password, 14)
                .then(hashedPassword => {
                    const user = new User({
                        name,
                        email,
                        password:hashedPassword
                    });
                    return user.save();
                }
                )
                .then(result => {
                    res.json({
                        message: 'User created successfully'
                    });
                })
        })

           
        .catch(err => {
            console.log(err);
        }
    );
});

router.post('/SignIn', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({
            error: 'Please add all the fields'
        });
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({
                    error: 'Invalid email or password'
                });
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({ message: 'Successfully signed in' });
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        res.json({ token, userId: savedUser._id, name: savedUser.name, email: savedUser.email });
                    } else {
                        return res.status(422).json({
                            error: 'Invalid email or password'
                        });
                    }
                })
        })
        .catch(err => {
            console.log(err);
        }
    );
});



module.exports = router;