const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NavItem = sequelize.define('NavItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  label: { type: DataTypes.STRING(100), allowNull: false },
  href: { type: DataTypes.STRING(300), allowNull: false },
  parent_id: { type: DataTypes.INTEGER, defaultValue: null },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_visible: { type: DataTypes.BOOLEAN, defaultValue: true },
  target: { type: DataTypes.ENUM('_self', '_blank'), defaultValue: '_self' },
  location: { type: DataTypes.ENUM('header', 'footer'), defaultValue: 'header' },
}, {
  tableName: 'nav_items',
  timestamps: true,
});

module.exports = NavItem;
