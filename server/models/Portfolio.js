const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Portfolio = sequelize.define('Visa', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
});

module.exports = Portfolio;