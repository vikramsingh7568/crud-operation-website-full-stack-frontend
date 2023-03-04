
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const router = require("./src/router/route")
const cors = require('cors')
app.use(express.json())
app.use(cors());

app.use("/",router)
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://vikramsingh7568:AlLbBhXCJYPKmwIK@cluster0.5swhv4u.mongodb.net/e-commerce-website-fullstack?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.listen(5000,function(){
    console.log("app is running on port no 5000")
})