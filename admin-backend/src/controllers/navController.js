const { NavItem } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const { location } = req.query;
    const where = location ? { location } : {};
    const items = await NavItem.findAll({ where, order: [['order_index', 'ASC']] });
    res.json({ success: true, data: items });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const item = await NavItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const item = await NavItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.reorder = async (req, res) => {
  try {
    const { order } = req.body;
    await Promise.all(order.map(({ id, order_index }) => NavItem.update({ order_index }, { where: { id } })));
    res.json({ success: true, message: 'Reordered' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const item = await NavItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
