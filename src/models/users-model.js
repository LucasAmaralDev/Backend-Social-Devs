
const { Model, DataTypes } = require('sequelize');
const { UserTypes, UserSex } = require('../enums/user-types');

class UsersModel extends Model {

    static init (sequelize) {
        super.init({
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            bio: DataTypes.STRING,
            avatar: DataTypes.STRING,
            password: DataTypes.STRING,
            date_birth: DataTypes.DATEONLY,
            sex: DataTypes.ENUM(UserSex.MASC, UserSex.FEM, UserSex.OUTRO),
            type: {
                type: DataTypes.ENUM(UserTypes.ADMINISTRATOR, UserTypes.COMMON),
                allowNull: false,
                defaultValue: UserTypes.COMMON,
            },
        }, {
            sequelize,
            modelName: 'Users',
            tableName: 'users',
            timestamps: false
        })
    }

    static associate (models) {
        this.hasMany(models.Posts, { foreignKey: 'user_id', as: 'posts' })
        this.hasMany(models.Followers, { foreignKey: 'follower_id', as: 'follower' })
        this.hasMany(models.Followers, { foreignKey: 'followed_id', as: 'followed' })
    }
}

module.exports = { UsersModel };