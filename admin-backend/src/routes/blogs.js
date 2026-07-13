const router = require('express').Router();
const c = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

router.get('/', c.getAll);                // public
router.get('/:slug', c.getOne);           // public
router.post('/', protect, c.create);
router.put('/:id', protect, c.update);
router.delete('/:id', protect, c.remove);

module.exports = router;
