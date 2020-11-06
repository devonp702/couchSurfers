
//User table
//Asking User for email and password
module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("User", {
       email: {
           type:Sequelize.STRING,
           allowNull: false,
           unique: true,
           validate: {
               isEmail: true
           }
       },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    
    });

    User.associate = function (models) {
        //associating User with Favorites
        User.hasMany(models.Favorites, {
            onDelete: "cascade"
        });
    };
    return User;
}