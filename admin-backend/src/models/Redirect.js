const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Redirect = sequelize.define('Redirect', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  from_url: { type: DataTypes.STRING(500), allowNull: false },
  to_url: { type: DataTypes.STRING(500), allowNull: false },
  redirect_type: { type: DataTypes.ENUM('301', '302'), defaultValue: '301' },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'redirects',
  timestamps: true,
});

module.exports = Redirect;
