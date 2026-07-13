require('dotenv').config();
const sequelize = require('./src/config/database');

async function fix() {
  await sequelize.authenticate();
  const { Setting } = require('./src/models');
  await Setting.update(
    { value: '/uploads/digital-aura-logo.png' },
    { where: { key: 'site_logo' } }
  );
  const s = await Setting.findOne({ where: { key: 'site_logo' } });
  console.log('site_logo is now:', s.value);
  process.exit(0);
}
fix().catch(e => { console.error(e.message); process.exit(1); });
