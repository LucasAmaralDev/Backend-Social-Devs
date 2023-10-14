const { Router } = require("express")
const { authMiddleware } = require("./middleware/auth-middleware")

const signupController = require("./controllers/users/signup-user-controller")
const loginController = require("./controllers/users/login-user-controller")
const loadProfileController = require("./controllers/users/loadprofile-user-controller")
const editProfileUserController = require("./controllers/users/editprofile-user-controller")

//controller para inviar informacoes do usuario logado
const myInfoUserController = require("./controllers/users/myInfo-user-controller")

const createPostController = require("./controllers/posts/create-post-controller")
const findPostController = require("./controllers/posts/find-post-controller")
const deletePostController = require("./controllers/posts/delete-post-controller")
const updatePostController = require("./controllers/posts/update-post-controller")
const findallPostController = require("./controllers/posts/findall-post-controller")

const followFollowersController = require("./controllers/followers/follow-followers-controller")
const unfollowFollowersController = require("./controllers/followers/unfollow-followers-controller")


const routes = Router()


routes.post("/signup", signupController.signup)
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Use to do a login.
 *     tags:
 *       - name: Login
 *     consumes:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *          type: object
 *          properties:
 *            login:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: Logged
 *         examples:
 *              application/json:
 *                  {
 *                    jwt: string,
 *                  }
 */
routes.post("/login", loginController.login)
routes.get("/myProfile", authMiddleware, loadProfileController.loadMyProfile)
routes.get("/profile/:username", loadProfileController.loadProfile)
routes.put("/editProfile", authMiddleware, editProfileUserController.editProfile)

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