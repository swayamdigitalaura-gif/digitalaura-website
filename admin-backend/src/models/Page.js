const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Page = sequelize.define('Page', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  meta_title: { type: DataTypes.STRING(200) },
  meta_desc: { type: DataTypes.TEXT },
  keywords: { type: DataTypes.TEXT },
  schema_code: { type: DataTypes.TEXT("long") },
  head_tags: { type: DataTypes.TEXT("long") },
  og_image: { type: DataTypes.STRING(500) },
  canonical: { type: DataTypes.STRING(500) },
  status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' },
  grapes_data: { type: DataTypes.TEXT("long"), defaultValue: '{}' },
}, {
  tableName: 'pages',
  timestamps: true,
});

module.exports = Page;
