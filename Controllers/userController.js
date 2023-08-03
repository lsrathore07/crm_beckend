const userModal= require("../Model/userModel")

 const getAllUsers =async (req,res)=>{
      
    try {
        const Users = await userModal.find({})
        res.status(200).send(Users)
        
    }catch(e){
        console.log(e.message)
    }
    
}

module.exports={
    getAllUsers
}