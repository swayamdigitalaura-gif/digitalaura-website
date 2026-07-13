const router = require('express').Router({ mergeParams: true });
const c = require('../controllers/sectionController');
const { protect } = require('../middleware/auth');

router.get('/', protect, c.getByPage);
router.post('/', protect, c.create);
router.put('/reorder', protect, c.reorder);
router.put('/:id', protect, c.update);
router.delete('/:id', protect, c.remove);

module.exports = router;
