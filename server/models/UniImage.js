const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UniImage = sequelize.define('UniImage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, allowNull: false},
    universityId: {type: DataTypes.INTEGER, allowNull: false},
});
module.exports = UniImage;