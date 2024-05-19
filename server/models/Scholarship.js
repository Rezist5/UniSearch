const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Scholarship = sequelize.define('Scholarship', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    requirements: {type: DataTypes.STRING, allowNull: false},
    universityId: {type: DataTypes.INTEGER, allowNull: false},
    value: {type: DataTypes.INTEGER, allowNull: false},
});
module.exports = Scholarship;