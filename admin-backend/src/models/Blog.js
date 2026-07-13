const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blog = sequelize.define('Blog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  excerpt: { type: DataTypes.TEXT },
  content: { type: DataTypes.TEXT("long") },
  cover_image: { type: DataTypes.STRING(500) },
  category: { type: DataTypes.STRING(100) },
  tags: { type: DataTypes.TEXT, defaultValue: '[]' },
  status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' },
  author_id: { type: DataTypes.INTEGER },
  meta_title: { type: DataTypes.STRING(200) },
  meta_desc: { type: DataTypes.TEXT },
  keywords: { type: DataTypes.TEXT },
  schema_code: { type: DataTypes.TEXT("long") },
  head_tags: { type: DataTypes.TEXT("long") },
  og_image: { type: DataTypes.STRING(500) },
  canonical: { type: DataTypes.STRING(500) },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'blogs',
  timestamps: true,
});

module.exports = Blog;
