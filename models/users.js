
//User table
//Asking User for username and password
module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("User", {
       username: {
           type:Sequelize.STRING,
           allowNull: false,
           unique: true,
       },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    //associating User with Entry
    User.associate = function (models) {
        User.hasMany(models.Entry, {
            onDelete: "cascade"
        });
    };
    return User;
};