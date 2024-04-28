const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Language = sequelize.define('Language', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
});

module.exports = Language;