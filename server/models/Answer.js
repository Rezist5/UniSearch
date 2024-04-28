const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Answer = sequelize.define('Answer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    requestId: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
});
module.exports = Answer;