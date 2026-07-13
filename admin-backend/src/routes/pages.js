const router = require('express').Router();
const c = require('../controllers/pageController');
const { protect } = require('../middleware/auth');

router.get('/', protect, c.getAll);
router.get('/:slug', c.getOne);           // public (frontend reads this)
router.post('/', protect, c.create);
router.put('/:id', protect, c.update);
router.put('/:id/builder', protect, c.saveBuilder);
router.put('/:id/publish', protect, c.publish);
router.delete('/:id', protect, c.remove);

module.exports = router;
