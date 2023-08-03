const mongoose = require("mongoose")
const express = require("express")
const bodyParser =require("body-parser")
require('dotenv').config()
const {DB_URL} = require("./Configs/db.configs")
const {PORT} = require("./Configs/server.configs")
const userRoutes =require("./Routes/userRoute")
const authRoutes = require("./Routes/authRoutes")




const app=express()
app.use(bodyParser.json());



mongoose.connect(DB_URL,{useNewUrlParser:true})
.then(()=>console.log("Mongodb Successfully Connected"))
.catch((e)=>{ console.log(e.message)})



//write an api to insert a new user into database



userRoutes(app)
authRoutes(app)

app.listen((3000),()=>{
    console.log(`server is running on port ${PORT}`)
})