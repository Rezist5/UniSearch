const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Visa = sequelize.define('Visa', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    duration: {type: DataTypes.INTEGER, allowNull: false},
    Deadline_of_registration: {type: DataTypes.DATE, allowNull: false},
    countryId: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
});
module.exports = Visa;