const {Model, DataTypes} = require('sequelize')

class FollowersModel extends Model{
    static init(sequelize){
        super.init({
            follower_id: DataTypes.INTEGER,
            followed_id: DataTypes.INTEGER
        },{
            sequelize,
            modelName: 'Followers',
            tableName: 'followers',
            timestamps: false
        })
    }

    static associate(models){
        this.belongsTo(models.Users, {foreignKey: 'follower_id', as: 'follower'})
        this.belongsTo(models.Users, {foreignKey: 'followed_id', as: 'followed'})
    }

}

module.exports = {FollowersModel};