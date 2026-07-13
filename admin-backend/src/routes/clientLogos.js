const router = require('express').Router();
const { ClientLogo } = require('../models');
const { protect } = require('../middleware/auth');

// Public: get logos for a service page
router.get('/', async (req, res) => {
  try {
    const where = { is_active: true };
    if (req.query.service_page) where.service_page = req.query.service_page;
    const logos = await ClientLogo.findAll({ where, order: [['order_index', 'ASC'], ['id', 'ASC']] });
    res.json({ data: logos });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Admin: get all (including inactive)
router.get('/all', protect, async (req, res) => {
  try {
    const logos = await ClientLogo.findAll({ order: [['service_page', 'ASC'], ['order_index', 'ASC']] });
    res.json({ data: logos });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const logo = await ClientLogo.create(req.body);
    res.json({ data: logo });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    await ClientLogo.update(req.body, { where: { id: req.params.id } });
    const logo = await ClientLogo.findByPk(req.params.id);
    res.json({ data: logo });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await ClientLogo.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
