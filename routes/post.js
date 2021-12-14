const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
let Post = require('../Schema/postSchema')
Post = mongoose.model('Post', Post)
const protect = require('../middleware/protect')

router.post('/createpost',protect,(req,res)=>{
    const {title,body} = req.body 
    if(!title || !body){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    // req.user.password = undefined
    const newPost = new Post({
        title,
        body,
        postedBy:req.user
    })
    newPost.save().then(result=>{
        res.json({newPost:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router;