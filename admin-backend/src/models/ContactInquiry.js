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
}, {
  tableName: 'contact_inquiries',
  timestamps: true,
});

module.exports = ContactInquiry;
