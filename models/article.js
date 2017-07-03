module.exports = function(sequelize, DataTypes) {
    var Article = sequelize.define("Article", {
        title: DataTypes.STRING,
        content: DataTypes.BLOB,
        image: DataTypes.STRING,
        tag: DataTypes.STRING
    });
    return Article;
};