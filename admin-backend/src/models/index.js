const sequelize = require('../config/database');
const User = require('./User');
const Page = require('./Page');
const Section = require('./Section');
const Media = require('./Media');
const Blog = require('./Blog');
const Testimonial = require('./Testimonial');
const Career = require('./Career');
const Application = require('./Application');
const ContactInquiry = require('./ContactInquiry');
const Setting = require('./Setting');
const NavItem = require('./NavItem');
const TeamMember = require('./TeamMember');
const ClientLogo = require('./ClientLogo');
const Redirect = require('./Redirect');

// Associations
Page.hasMany(Section, { foreignKey: 'page_id', as: 'sections', onDelete: 'CASCADE' });
Section.belongsTo(Page, { foreignKey: 'page_id', as: 'page' });

Blog.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
Career.hasMany(Application, { foreignKey: 'career_id', as: 'applications', onDelete: 'CASCADE' });
Application.belongsTo(Career, { foreignKey: 'career_id', as: 'job' });

module.exports = {
  sequelize,
  User, Page, Section, Media, Blog,
  Testimonial, Career, Application, ContactInquiry, Setting, NavItem, TeamMember, ClientLogo, Redirect,
};
