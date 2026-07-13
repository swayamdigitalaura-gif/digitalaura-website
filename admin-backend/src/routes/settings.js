const router = require('express').Router();
const c = require('../controllers/settingController');
const { protect } = require('../middleware/auth');

router.get('/', c.getAll);                // public (frontend reads site settings)
router.post('/', protect, c.upsert);
router.put('/:key', protect, c.updateByKey);
router.delete('/:key', protect, c.deleteByKey);
router.post('/bulk', protect, c.bulkUpsert);

module.exports = router;
