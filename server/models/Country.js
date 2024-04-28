const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Country = sequelize.define('Country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    Image : {type: DataTypes.STRING, allowNull: true},
});
module.exports = Country;