const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Setting = sequelize.define('Setting', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  value: { type: DataTypes.TEXT("long") },
  type: { type: DataTypes.ENUM('text', 'json', 'boolean', 'number', 'image'), defaultValue: 'text' },
  group: { type: DataTypes.STRING(50), defaultValue: 'general' },
  label: { type: DataTypes.STRING(150) },
}, {
  tableName: 'settings',
  timestamps: true,
});

module.exports = Setting;
