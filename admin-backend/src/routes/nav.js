const router = require('express').Router();
const c = require('../controllers/navController');
const { protect } = require('../middleware/auth');

router.get('/', c.getAll);                // public
router.post('/', protect, c.create);
router.put('/reorder', protect, c.reorder);
router.put('/:id', protect, c.update);
router.delete('/:id', protect, c.remove);

module.exports = router;
