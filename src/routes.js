const { Router } = require("express")
var jwt = require('jsonwebtoken');
const { authMiddleware } = require("./middleware/auth-middleware")



const signupController = require("./Controllers/users/signup-user-controller")
const loginController = require("./Controllers/users/login-user-controller")

const createPostController = require("./Controllers/posts/create-post-controller")
const findPostController = require("./Controllers/posts/find-post-controller")
const deletePostController = require("./Controllers/posts/delete-post-controller")
const updatePostController = require("./Controllers/posts/update-post-controller")


const routes = Router()


routes.post("/signup", signupController.signup)
routes.post("/login", loginController.login)

routes.get("/posts/:id", findPostController.find)
routes.post("/posts", authMiddleware, createPostController.create)
routes.delete("/posts/:id", authMiddleware, deletePostController.delete)
routes.put("/posts/:id", authMiddleware, updatePostController.update)





module.exports = { routes };