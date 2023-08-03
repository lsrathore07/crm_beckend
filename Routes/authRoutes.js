const {register, login} = require("../Controllers/auth.Controller")

module.exports =function(app){

 app.post("/crm/api/v1/signup",register)
 app.post("/crm/api/v1/signin",login)


}