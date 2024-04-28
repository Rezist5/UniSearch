const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SubjectExam = sequelize.define('SubjectExam', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    minPoints: { type: DataTypes.INTEGER, allowNull: false },
});
module.exports = SubjectExam;
