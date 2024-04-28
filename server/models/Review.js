const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Review = sequelize.define('Review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    universityId: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, allowNull: false},
    parentId: { type: DataTypes.INTEGER }
});
module.exports = Review;