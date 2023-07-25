const { Router } = require("express")
var jwt = require('jsonwebtoken');



const signupController = require("./Controllers/users/signup-user-controller")
const loginController = require("./Controllers/users/login-user-controller")




const routes = Router()


routes.post("/signup", signupController.signup)
routes.post("/login", loginController.login)




module.exports = { routes };