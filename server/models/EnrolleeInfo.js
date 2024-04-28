const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const EnrolleeInfo = sequelize.define('EnrolleeInfo', {
    grade: {type: DataTypes.INTEGER, allowNull: false},
    age: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = EnrolleeInfo;