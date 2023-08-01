const mongoose = require("mongoose")
const express = require("express")
const bodyParser =require("body-parser")
const validator = require("validator")
const bcrypt = require("bcrypt")

const app=express()
app.use(bodyParser.json());
const DB_URL="mongodb+srv://lokendrasingh071201:lucky123@cluster0.b3rgvtd.mongodb.net/"



mongoose.connect(DB_URL,{useNewUrlParser:true})
.then(()=>console.log("Mongodb Successfully Connected"))
.catch((e)=>{ console.log(e.message)})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        lowerCase:true,
        required:true,
        unique:true,
        minLength:3,
        maxLength:9
    }
    ,
    email:{
        type:String,
        required:true,
        lowerCase:true,
        unique:true,
        validate:{
            validator:validator.isEmail
        }
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        enum:["CUSTOMER","ENGINEER","ADMIN"],
        default:"CUSTOMER"

    },
    userStatus:{
        type:String,
        required:true,
        enum:["PENDING","APPROVED","REJECTED"],
        default:"PENDING"
    }
},{timeStamps:true})


const userModal = mongoose.model("User",userSchema)

//write an api to insert a new user into database

app.post("/crm/api/v1/signup",(req,res)=>{

    const {name,userId,email,password,userType,userStatus}=req.body;

    const hashedPassword = bcrypt.hashSync(password,10)

    const user ={
        name,
        userId,
        password:hashedPassword,
        email,
        userType,
        userStatus:(userStatus==="CUSTOMER"?"APPROVED":"PENDING")
    }

    const newUser = new userModal(user);

    newUser.save()
    .then((data)=>{
        console.log(data)
        res.status(200).send({message:"User Created Successfully"})
   })
   .catch(err=>{
    if(err.code===11000){
        return res.status(400).send({message:"UserId/Email already exists in the database"});
    }
    return res.status(500).send({message:"internal err"})
})

    
})



app.listen((3000),()=>{
    console.log("server is running on port 3000")
})