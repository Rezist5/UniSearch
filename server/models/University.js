const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const University = sequelize.define('University', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cityId: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.INTEGER, allowNull: false},
    YearOfFoundation: {type: DataTypes.DATE, allowNull: false},
    NumberOfStudents: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = University;