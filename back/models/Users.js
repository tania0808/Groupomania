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
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        userImageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'http://localhost:3000/images/profile/profile.jpeg',
        }
    });

    Users.associate = (models) => {

        Users.hasMany(models.Likes, {
            onDelete: 'cascade'
        });
    };

    



    return Users;
}