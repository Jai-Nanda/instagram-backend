const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// const User = mongoose.model("User")
const Post = require('../Schema/postSchema')
mongoose.model("Post")
const protect = require('../middleware/protect')

router.post('/createpost',protect,(req,res)=>{
    const {title,body,pic} = req.body 
    if(!title || !body){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router;