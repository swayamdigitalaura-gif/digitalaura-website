const router = require('express').Router();
const c = require('../controllers/teamController');
const { protect } = require('../middleware/auth');

router.get('/', c.getVisible);          // public - returns visible members only
router.get('/all', protect, c.getAll);  // protected - returns all members
router.post('/', protect, c.create);
router.put('/:id', protect, c.update);
router.delete('/:id', protect, c.remove);

module.exports = router;
