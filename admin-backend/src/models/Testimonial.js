const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  role: { type: DataTypes.STRING(100) },
  company: { type: DataTypes.STRING(100) },
  photo: { type: DataTypes.STRING(500) },
  quote: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.TINYINT, defaultValue: 5 },
  platform: { type: DataTypes.STRING(50) },
  is_visible: { type: DataTypes.BOOLEAN, defaultValue: true },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
  video_url: { type: DataTypes.STRING(500) },
  testimonial_type: { type: DataTypes.ENUM('text', 'video'), defaultValue: 'text' },
}, {
  tableName: 'testimonials',
  timestamps: true,
});

module.exports = Testimonial;
