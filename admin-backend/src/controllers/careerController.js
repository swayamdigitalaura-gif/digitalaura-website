const { Op } = require('sequelize');
const { Career, Application } = require('../models');
const { sendMail, NOTIFY_EMAIL } = require('../utils/mailer');

function makeSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function uniqueSlug(title, excludeId = null) {
  let base = makeSlug(title);
  let slug = base;
  let n = 1;
  while (true) {
    const where = { slug };
    if (excludeId) where.id = { [Op.ne]: excludeId };
    const existing = await Career.findOne({ where });
    if (!existing) return slug;
    slug = `${base}-${n++}`;
  }
}

exports.getAll = async (req, res) => {
  try {
    const list = await Career.findAll({ order: [['order_index', 'ASC']] });
    res.json({ success: true, data: list });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const param = req.params.id;
    // Try by slug first, then by numeric id
    const item = await Career.findOne({
      where: isNaN(param) ? { slug: param } : { [Op.or]: [{ slug: param }, { id: param }] },
      include: [{ model: Application, as: 'applications' }],
    });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const slug = await uniqueSlug(req.body.title);
    const item = await Career.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const item = await Career.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    // Regenerate slug if title changed or slug is missing
    if (req.body.title && (req.body.title !== item.title || !item.slug)) {
      req.body.slug = await uniqueSlug(req.body.title, item.id);
    }
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const item = await Career.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// Applications
exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.findAll({ where: { career_id: req.params.id }, include: [{ model: Career, as: 'job', attributes: ['title'] }] });
    res.json({ success: true, data: apps });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.applyPublic = async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career || career.status === 'closed')
      return res.status(400).json({ success: false, message: 'Position not available' });
    const app = await Application.create({ ...req.body, career_id: req.params.id, cv_url: req.file ? `/uploads/${req.file.filename}` : null });

    const { name, email, phone, experience, linkedin } = req.body;

    // Notify HR
    sendMail({
      to: process.env.HR_EMAIL || 'hr@thedigitalaura.com',
      subject: `💼 New Application — ${career.title} (${name})`,
      html: `
        <h2 style="color:#7C3AED">New Job Application</h2>
        <p style="font-size:15px;color:#374151">Position: <strong>${career.title}</strong></p>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px;font-weight:600;color:#374151;width:140px">Name</td><td style="padding:8px;color:#0A1628">${name}</td></tr>
          <tr style="background:#F8FAFF"><td style="padding:8px;font-weight:600;color:#374151">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:600;color:#374151">Phone</td><td style="padding:8px;color:#0A1628">${phone || '—'}</td></tr>
          <tr style="background:#F8FAFF"><td style="padding:8px;font-weight:600;color:#374151">Experience</td><td style="padding:8px;color:#0A1628">${experience || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600;color:#374151">LinkedIn</td><td style="padding:8px;color:#0A1628">${linkedin || '—'}</td></tr>
          ${app.cv_url ? `<tr style="background:#F8FAFF"><td style="padding:8px;font-weight:600;color:#374151">CV</td><td style="padding:8px"><a href="${process.env.BACKEND_URL || 'http://localhost:5000'}${app.cv_url}">Download CV</a></td></tr>` : ''}
        </table>
        <p style="font-size:12px;color:#9CA3AF;margin-top:20px">Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      `,
    });

    // Auto-reply to applicant
    sendMail({
      to: email,
      subject: `Application Received — ${career.title} at Digital Aura`,
      html: `
        <div style="font-family:sans-serif;max-width:560px">
          <h2 style="color:#7C3AED">Application Received!</h2>
          <p style="color:#374151">Hi ${name.split(' ')[0]},</p>
          <p style="color:#374151">Thank you for applying for the <strong>${career.title}</strong> position at Digital Aura. We've received your application and our HR team will review it shortly.</p>
          <p style="color:#374151">We typically respond within <strong>2–3 business days</strong>. In the meantime, if you have any questions feel free to reach us at <a href="mailto:hr@thedigitalaura.com">hr@thedigitalaura.com</a>.</p>
          <p style="color:#9CA3AF;font-size:12px;margin-top:24px">— HR Team, Digital Aura, Ahmedabad</p>
        </div>
      `,
    });

    res.status(201).json({ success: true, message: 'Application submitted!', data: app });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const app = await Application.findByPk(req.params.appId);
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    await app.update({ status: req.body.status });
    res.json({ success: true, data: app });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
