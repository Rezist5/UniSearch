const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Direction = sequelize.define('Direction', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
});
module.exports = Direction;