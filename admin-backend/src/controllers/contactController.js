const { ContactInquiry } = require('../models');
const { sendMail, NOTIFY_EMAIL } = require('../utils/mailer');

exports.submit = async (req, res) => {
  try {
    const body = req.body || {};
    const { name, email, phone, company, project, budget, message, source } = body;
    if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email are required' });

    const inquiry = await ContactInquiry.create({ name, email, phone, company, project, budget, message: message || '', source: source || 'website' });

    // Notify team
    sendMail({
      to: NOTIFY_EMAIL,
      subject: `📩 New Contact Inquiry — ${name}`,
      html: `
        <h2 style="color:#FF6B2B">New Project Inquiry</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px;font-weight:600;color:#374151;width:140px">Name</td><td style="padding:8px;color:#0A1628">${name}</td></tr>
          <tr style="background:#F8FAFF"><td style="padding:8px;font-weight:600;color:#374151">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:600;color:#374151">Phone</td><td style="padding:8px;color:#0A1628">${phone || '—'}</td></tr>
          <tr style="background:#F8FAFF"><td style="padding:8px;font-weight:600;color:#374151">Company</td><td style="padding:8px;color:#0A1628">${company || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600;color:#374151">Service</td><td style="padding:8px;color:#0A1628">${project || '—'}</td></tr>
          <tr style="background:#F8FAFF"><td style="padding:8px;font-weight:600;color:#374151">Budget</td><td style="padding:8px;color:#0A1628">${budget || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600;color:#374151;vertical-align:top">Message</td><td style="padding:8px;color:#0A1628">${message}</td></tr>
        </table>
        <p style="font-size:12px;color:#9CA3AF;margin-top:20px">Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      `,
    });

    // Auto-reply to sender
    sendMail({
      to: email,
      subject: `Thank you for reaching out, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family:sans-serif;max-width:560px">
          <h2 style="color:#FF6B2B">We've received your message!</h2>
          <p style="color:#374151">Hi ${name.split(' ')[0]},</p>
          <p style="color:#374151">Thank you for contacting Digital Aura. Our team will review your project brief and get back to you within <strong>2 hours</strong> with a tailored proposal.</p>
          <p style="color:#374151">If you need urgent help, reach us directly:</p>
          <p style="color:#374151"><strong>📞 +91 81412 00284</strong><br><strong>✉️ info@thedigitalaura.com</strong></p>
          <p style="color:#9CA3AF;font-size:12px;margin-top:24px">— Team Digital Aura, Ahmedabad</p>
        </div>
      `,
    });

    res.status(201).json({ success: true, message: 'Inquiry submitted!', data: inquiry });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const list = await ContactInquiry.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: list });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateStatus = async (req, res) => {
  try {
    const item = await ContactInquiry.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.update({ status: req.body.status });
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const item = await ContactInquiry.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
