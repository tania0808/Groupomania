module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING
        },
        
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })

    Posts.associate = (models) => {

        Posts.hasMany(models.Likes, {
            onDelete: 'cascade',
        });
        
    }

    return Posts;
}