module.exports = (sequelize, DataTypes) => {
    
    const Posts = sequelize.define("Posts", {
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Likes, {
            onDelete: 'cascade',
        }),

        Posts.belongsTo(models.Users)
    }
    return Posts;
}