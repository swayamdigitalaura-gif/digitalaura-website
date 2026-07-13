const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TeamMember = sequelize.define('TeamMember', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  role: { type: DataTypes.STRING(150) },
  department: { type: DataTypes.STRING(100) },
  photo: { type: DataTypes.STRING(500) },
  color: { type: DataTypes.STRING(20), defaultValue: '#FF6B2B' },
  is_ai: { type: DataTypes.BOOLEAN, defaultValue: false },
  bio: { type: DataTypes.TEXT },
  linkedin: { type: DataTypes.STRING(300) },
  is_visible: { type: DataTypes.BOOLEAN, defaultValue: true },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'team_members',
  timestamps: true,
});

module.exports = TeamMember;
