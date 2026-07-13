const { Setting } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const { group } = req.query;
    const where = group ? { group } : {};
    const settings = await Setting.findAll({ where });
    // Return as key-value map
    const map = {};
    settings.forEach(s => { map[s.key] = s.value; });
    res.json({ success: true, data: map, raw: settings });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.upsert = async (req, res) => {
  try {
    const { key, value, type, group, label } = req.body;
    const [setting, created] = await Setting.findOrCreate({
      where: { key },
      defaults: { value, type: type || 'text', group: group || 'general', label },
    });
    if (!created) await setting.update({ value, ...(type && { type }), ...(label && { label }) });
    res.json({ success: true, data: setting });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const [setting] = await Setting.findOrCreate({ where: { key }, defaults: { value, type: 'text', group: 'general', label: key } });
    await setting.update({ value });
    res.json({ success: true, data: setting });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOne({ where: { key } });
    if (!setting) return res.status(404).json({ success: false, message: 'Setting not found' });
    await setting.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.bulkUpsert = async (req, res) => {
  try {
    const { settings } = req.body; // [{ key, value, type, group, label }]
    const results = await Promise.all(settings.map(async ({ key, value, type, group, label }) => {
      const [s, created] = await Setting.findOrCreate({
        where: { key },
        defaults: { value, type: type || 'text', group: group || 'general', label },
      });
      if (!created) await s.update({ value });
      return s;
    }));
    res.json({ success: true, data: results });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
