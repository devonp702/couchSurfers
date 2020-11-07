
//User table
//Asking User for username and password
module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("User", {
       username: {
           type:Sequelize.STRING,
           allowNull: false,
           unique: true
       },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    console.log(User);

    User.associate = function (models) {
        //associating User with Entry
        User.hasMany(models.Entry, {
            onDelete: "cascade"
        });
    };
    console.log(User);
    return User;
}