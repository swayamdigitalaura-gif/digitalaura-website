const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Section = sequelize.define('Section', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  page_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  type: { type: DataTypes.STRING(50), allowNull: false },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_visible: { type: DataTypes.BOOLEAN, defaultValue: true },
  data: { type: DataTypes.TEXT("long"), defaultValue: '{}' },
  styles: { type: DataTypes.TEXT("long"), defaultValue: '{}' },
}, {
  tableName: 'sections',
  timestamps: true,
});

module.exports = Section;
