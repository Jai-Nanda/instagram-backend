const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const protect = require('../middleware/protect')

router.post('/createpost', protect, (req, res) => {
    const { title, body } = req.body
    if (!title || !body) {
        return res.status(422).json({error:"please add all the fields"})
    }
    console.log(req.user)
    res.send("hello")
})