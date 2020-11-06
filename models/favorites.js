

Favorites table
module.exports = function (sequelize, Sequelize) {
    var Favorites = sequelize.define("Favorites", {
        location: {type: Sequelize.STRING, allowNull: false},
        url: {type: Sequelize.STRING},
        foreignKey: {type: Sequelize.STRING}
    });

    Favorites.associate = function (models) {
        Favorites.hasOne(models.User, {
            onDelete: "cascade"
        });

        Favorites.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Favorites;
};