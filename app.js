const express = require('express');
const app = express()
const mongoose = require("mongoose");
const PORT = 5000
const { MONGOURI } = require("./password");
const auth = require('./routes/auth');
const post = require('./routes/post');
const cors = require('cors');
// pW39HPpfBG1puyRe




mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
    console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
    console.error("error connecting to mongo", err);
});
app.use(cors());
require("./Schema/userSchema");
require("./Schema/postSchema");
app.use(express.json());
app.use(auth)
app.use('/post', post)

app.listen(PORT, ()=>{
    console.log('server started at port '+PORT);
})