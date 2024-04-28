const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RepresentativeInfo = sequelize.define('RepresentativeInfo', {
    universityId: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
});
module.exports = RepresentativeInfo;