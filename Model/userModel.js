const mongoose = require("mongoose")
const validator = require("validator")
const {userTypes,userStatus} = require("../utils/constants")


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
        enum:Object.values(userTypes),
        default:userTypes.customer

    },
    userStatus:{
        type:String,
        enum:Object.values(userStatus),
        default:userStatus.pending
    }
},{timeStamps:true})


module.exports = mongoose.model("User",userSchema)
