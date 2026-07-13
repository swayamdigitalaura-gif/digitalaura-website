const router = require('express').Router();
const c = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/', c.submit);                    // public — frontend form
router.get('/', protect, c.getAll);            // admin only
router.put('/:id', protect, c.updateStatus);   // admin only
router.delete('/:id', protect, c.remove);      // admin only

module.exports = router;
