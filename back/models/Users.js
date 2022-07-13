module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userImageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'http://localhost:3000/images/profile/profile.jpeg',
        },
        userPosition: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: 'cascade'
        }),
        Users.hasMany(models.Posts, {
            onDelete: 'cascade'
        })
    };
    return Users;
}