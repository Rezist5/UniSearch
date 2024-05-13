const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Country = sequelize.define('Country', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    iso: {
        type: DataTypes.CHAR(2),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    nicename: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    iso3: {
        type: DataTypes.CHAR(3),
        defaultValue: null
    },
    numcode: {
        type: DataTypes.SMALLINT(6),
        defaultValue: null
    },
    phonecode: {
        type: DataTypes.INTEGER(5),
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Country;