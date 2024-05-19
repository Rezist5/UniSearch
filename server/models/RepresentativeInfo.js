const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RepresentativeInfo = sequelize.define('RepresentativeInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});
module.exports = RepresentativeInfo;