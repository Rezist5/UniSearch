const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ReviewReply = sequelize.define('ReviewReply', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    parentId: { type: DataTypes.INTEGER, allowNull: false }, 
    content: { type: DataTypes.STRING, allowNull: false }
});

module.exports = ReviewReply;