const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Exam = sequelize.define('Exam', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    maxPoints: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = Exam;