const router = require('express').Router();
const c = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

router.get('/', c.getAll);                // public
router.post('/', protect, c.create);
router.put('/:id', protect, c.update);
router.delete('/:id', protect, c.remove);
router.post('/refresh-google', protect, c.refreshGoogle);

module.exports = router;
