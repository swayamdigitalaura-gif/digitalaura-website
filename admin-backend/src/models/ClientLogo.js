const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClientLogo = sequelize.define('ClientLogo', {
  id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  service_page: { type: DataTypes.STRING(100), allowNull: false },
  name:         { type: DataTypes.STRING(150), allowNull: false },
  tag:          { type: DataTypes.STRING(100), allowNull: false },
  logo_url:     { type: DataTypes.TEXT, allowNull: false },
  logo_bg:      { type: DataTypes.STRING(30), defaultValue: '#f0f8ff' },
  order_index:  { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active:    { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'client_logos',
  timestamps: true,
});

module.exports = ClientLogo;
