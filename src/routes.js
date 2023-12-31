const { Router } = require("express")
var jwt = require('jsonwebtoken');
const { authMiddleware } = require("./middleware/auth-middleware")



const signupController = require("./Controllers/users/signup-user-controller")
const loginController = require("./Controllers/users/login-user-controller")
const loadProfileController = require("./Controllers/users/loadprofile-user-controller")
const editProfileUserController = require("./Controllers/users/editprofile-user-controller")

//controller para inviar informacoes do usuario logado
const myInfoUserController = require("./Controllers/users/myInfo-user-controller")



const createPostController = require("./Controllers/posts/create-post-controller")
const findPostController = require("./Controllers/posts/find-post-controller")
const deletePostController = require("./Controllers/posts/delete-post-controller")
const updatePostController = require("./Controllers/posts/update-post-controller")
const findallPostController = require("./Controllers/posts/findall-post-controller")

const followFollowersController = require("./Controllers/followers/follow-followers-controller")
const unfollowFollowersController = require("./Controllers/followers/unfollow-followers-controller")

 
const routes = Router()


routes.post("/signup", signupController.signup)
routes.post("/login", loginController.login)
routes.get("/myProfile", authMiddleware, loadProfileController.loadMyProfile)
routes.get("/profile/:username", loadProfileController.loadProfile)
routes.put("/editProfile", authMiddleware, editProfileUserController.editarPerfil)

//rotas para enviar informacoes do usuario logado
routes.get("/myInfo", authMiddleware, myInfoUserController.getMyInfo)



routes.get("/posts/:id", findPostController.find)
routes.post("/posts", authMiddleware, createPostController.create)
routes.delete("/posts/:id", authMiddleware, deletePostController.delete)
routes.put("/posts/:id", authMiddleware, updatePostController.update)
routes.get("/posts", authMiddleware, findallPostController.findall)


routes.post("/follow/:id", authMiddleware, followFollowersController.follow)
routes.delete("/unfollow/:id", authMiddleware, unfollowFollowersController.unfollow)





module.exports = { routes };