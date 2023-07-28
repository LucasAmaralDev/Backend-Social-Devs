const { Sequelize } = require("sequelize")
const dbConfig = require("./config")

const sequelize = new Sequelize(dbConfig)

const { UsersModel } = require("../models/users-model")
const { PostsModel } = require("../models/posts-model")
const { FollowersModel } = require("../models/followers-model")

UsersModel.init(sequelize)
PostsModel.init(sequelize)
FollowersModel.init(sequelize)

UsersModel.associate(sequelize.models)
PostsModel.associate(sequelize.models)
FollowersModel.associate(sequelize.models)

module.exports = sequelize;

