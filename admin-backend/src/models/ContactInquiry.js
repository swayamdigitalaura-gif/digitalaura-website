const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactInquiry = sequelize.define('ContactInquiry', {
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:     { type: DataTypes.STRING(100), allowNull: false },
  email:    { type: DataTypes.STRING(150), allowNull: false },
  phone:    { type: DataTypes.STRING(30) },
  company:  { type: DataTypes.STRING(150) },
  project:  { type: DataTypes.STRING(100) },
  budget:   { type: DataTypes.STRING(60) },
  message:  { type: DataTypes.TEXT },
  status:   { type: DataTypes.ENUM('new', 'contacted', 'closed'), defaultValue: 'new' },
  source:   { type: DataTypes.STRING(100), defaultValue: 'website' },
  // Attribution: where the lead came from (see src/lib/leadTracking.ts on the site)
  page:           { type: DataTypes.STRING(500) },
  landing_page:   { type: DataTypes.STRING(500) },
  referrer:       { type: DataTypes.STRING(500) },
  utm_source:     { type: DataTypes.STRING(150) },
  utm_medium:     { type: DataTypes.STRING(150) },
  utm_campaign:   { type: DataTypes.STRING(250) },
  utm_term:       { type: DataTypes.STRING(250) },
  utm_content:    { type: DataTypes.STRING(250) },
  traffic_source: { type: DataTypes.STRING(100) },
}, {
  tableName: 'contact_inquiries',
  timestamps: true,
});

module.exports = ContactInquiry;
