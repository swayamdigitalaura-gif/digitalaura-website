const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define('Media', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  filename: { type: DataTypes.STRING(255), allowNull: false },
  original_name: { type: DataTypes.STRING(255) },
  url: { type: DataTypes.STRING(500), allowNull: false },
  mime_type: { type: DataTypes.STRING(100) },
  size: { type: DataTypes.INTEGER },
  alt_text: { type: DataTypes.STRING(255) },
}, {
  tableName: 'media',
  timestamps: true,
});

module.exports = Media;
