const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const City = sequelize.define('City', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    countryId: {type: DataTypes.INTEGER, allowNull: false},
});
module.exports = City;