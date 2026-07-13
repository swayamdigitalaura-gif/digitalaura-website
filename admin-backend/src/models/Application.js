const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  career_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false },
  phone: { type: DataTypes.STRING(20) },
  linkedin: { type: DataTypes.STRING(300) },
  experience: { type: DataTypes.STRING(50) },
  why_join: { type: DataTypes.TEXT },
  cv_url: { type: DataTypes.STRING(500) },
  status: { type: DataTypes.ENUM('new', 'reviewing', 'shortlisted', 'rejected'), defaultValue: 'new' },
}, {
  tableName: 'applications',
  timestamps: true,
});

module.exports = Application;
