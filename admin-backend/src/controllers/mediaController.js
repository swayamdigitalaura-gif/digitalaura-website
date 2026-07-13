const { Media } = require('../models');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const media = await Media.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: media });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    const media = await Media.create({
      filename: req.file.filename,
      original_name: req.file.originalname,
      url,
      mime_type: req.file.mimetype,
      size: req.file.size,
      alt_text: req.body.alt_text || '',
    });
    res.status(201).json({ success: true, data: media });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: 'Media not found' });
    await media.update({ alt_text: req.body.alt_text });
    res.json({ success: true, data: media });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: 'Media not found' });
    const filePath = path.join(__dirname, '../../uploads', media.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await media.destroy();
    res.json({ success: true, message: 'Media deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
