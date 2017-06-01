module.exports = function(sequelize, DataTypes) {
    var Article = sequelize.define("Article", {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        tag: DataTypes.STRING
    });
    return Article;
};