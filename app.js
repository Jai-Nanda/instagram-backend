const express = require('express');
const app = express()
const mongoose = require("mongoose");
const PORT = 5000
const { MONGOURI } = require("./password");
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

app.use(require("./routes/auth"));
// app.get('/', (req,res) =>{
//     res.send('chal ja');
// });


app.listen(PORT, ()=>{
    console.log('server started at port '+PORT);
})