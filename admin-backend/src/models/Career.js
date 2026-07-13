const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Career = sequelize.define('Career', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  slug: { type: DataTypes.STRING(220), unique: true },
  department: { type: DataTypes.STRING(100) },
  location: { type: DataTypes.STRING(100) },
  type: { type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'), defaultValue: 'full-time' },
  experience: { type: DataTypes.STRING(50) },
  description: { type: DataTypes.TEXT("long") },
  responsibilities: { type: DataTypes.TEXT, defaultValue: '[]' },
  requirements: { type: DataTypes.TEXT, defaultValue: '[]' },
  skills: { type: DataTypes.TEXT, defaultValue: '[]' },
  salary_range: { type: DataTypes.STRING(100) },
  openings: { type: DataTypes.INTEGER, defaultValue: 1 },
  work_mode: { type: DataTypes.ENUM('on-site', 'remote', 'hybrid'), defaultValue: 'on-site' },
  benefits: { type: DataTypes.TEXT, defaultValue: '[]' },
  interview_process: { type: DataTypes.TEXT, defaultValue: '[]' },
  deadline: { type: DataTypes.DATEONLY, allowNull: true },
  status: { type: DataTypes.ENUM('open', 'closed'), defaultValue: 'open' },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'careers',
  timestamps: true,
});

module.exports = Career;
