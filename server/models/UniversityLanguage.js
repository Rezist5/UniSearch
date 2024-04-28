const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UniversityLanguage = sequelize.define('UniversityLanguage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
module.exports = UniversityLanguage;