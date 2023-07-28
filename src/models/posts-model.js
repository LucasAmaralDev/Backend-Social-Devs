const { Model, DataTypes } = require('sequelize')


class PostsModel extends Model {
    static init (sequelize) {
        super.init({
            text: DataTypes.STRING,
            date: DataTypes.DATE,
            user_id: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: 'Posts',
            tableName: 'posts',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
    }

    static associate (models) {
        this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' })
    }

}

module.exports = { PostsModel };