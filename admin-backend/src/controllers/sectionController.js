const { Section } = require('../models');

exports.getByPage = async (req, res) => {
  try {
    const sections = await Section.findAll({
      where: { page_id: req.params.pageId },
      order: [['order_index', 'ASC']],
    });
    res.json({ success: true, data: sections });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const section = await Section.create({ ...req.body, page_id: req.params.pageId });
    res.status(201).json({ success: true, data: section });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    const { data, styles, is_visible, order_index, name } = req.body;
    await section.update({
      data: data ? JSON.stringify(data) : section.data,
      styles: styles ? JSON.stringify(styles) : section.styles,
      ...(is_visible !== undefined && { is_visible }),
      ...(order_index !== undefined && { order_index }),
      ...(name && { name }),
    });
    res.json({ success: true, data: section });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.reorder = async (req, res) => {
  try {
    const { order } = req.body; // [{ id, order_index }]
    await Promise.all(order.map(({ id, order_index }) =>
      Section.update({ order_index }, { where: { id } })
    ));
    res.json({ success: true, message: 'Sections reordered' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    await section.destroy();
    res.json({ success: true, message: 'Section deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
