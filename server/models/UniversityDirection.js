const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UniversityDirection = sequelize.define('UniversityDirection', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
module.exports = UniversityDirection;