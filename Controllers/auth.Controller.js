const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = (req,res)=>{

    const {name,userId,email,password,userType}=req.body;

    const hashedPassword = bcrypt.hashSync(password,10)

    const user ={
        name,
        userId,
        password:hashedPassword,
        email,
        userType,
        userStatus:(userType==="CUSTOMER"?"APPROVED":"PENDING")
    }

    const newUser = new userModel(user);

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
  
}

const login =async(req,res)=>{
//console.log(req.body)

const {userId,password}=req.body;

if(!userId || !password){
    res.status(400).send({message:"userId/password is not passed"})
}

try{
    const user = await userModel.findOne({userId:userId})
    //console.log(user)
    if(!user){
        res.status(404).send({message:`UserId`})
    }

   const isPasswordValid = bcrypt.compareSync(password,user.password)

   if(!isPasswordValid){
    res.status(400).send({message:"invalid password"})
   }

  const token = jwt.sign({id:userId},process.env.SECRET,{expiresIn:'1h'})
   //console.log(token)

   return res.status(200).send({
    name:user.name,
    email:user.email,
    userId:user.userId,
    userStatus:user.userStatus,
    userType:user.userType,
    accessToken:token

   })
}catch(e){
        res.status(500).send({message:e.message})
}

}

module.exports={
 register,
 login   
}