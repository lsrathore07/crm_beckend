const { getAllUsers } = require("../Controllers/userController")


module.exports=function(app){
     
    app.get("/crm/api/v1/users",getAllUsers)
}