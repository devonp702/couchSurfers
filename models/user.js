//id, name, url/ foreign key

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 140]
                //validation that checks our user is between 1 and 140 characters
            }
        },
        

    })
}