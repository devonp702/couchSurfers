module.exports = function(sequelize, DataTypes) {
    let Entry = sequelize.define("Entry", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 500]
            }
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: "Cities"
        }
       
    });
    console.log(Entry);
    return Entry;
};