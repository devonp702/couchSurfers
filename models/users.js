
//id, name, url/ foreign key


//User table

module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("User", {
        name: {type: Sequelize.STRING, allowNull: false},
        foreignKey: {type: Sequelize.STRING}   
    
    });

    User.associate = function (models) {
        //associating User with Favorites
        User.hasMany(models.Favorites, {
            onDelete: "cascade"
        });
    };
    return User;
}