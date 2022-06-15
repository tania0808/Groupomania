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
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING
        },
        likes: {
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        dislikes: {
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        usersLiked: {
            type:DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('usersLiked'));
            }, 
            set: function(val) {
                return this.setDataValue('usersLiked', JSON.stringify(val));
            }
        },
        usersDisliked: {
            type:DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('usersDisliked'));
            }, 
            set: function(val) {
                return this.setDataValue('usersDisliked', JSON.stringify(val));
            }
        }

    })

    return Posts;
}