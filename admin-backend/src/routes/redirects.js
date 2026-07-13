const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/redirectController');
const { protect } = require('../middleware/auth');

router.get('/', ctrl.getAll); // public — frontend needs this for client-side redirect handling
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
