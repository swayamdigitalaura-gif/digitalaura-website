const router = require('express').Router();
const c = require('../controllers/mediaController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', protect, c.getAll);
router.post('/', protect, upload.single('file'), c.upload);
router.put('/:id', protect, c.update);
router.delete('/:id', protect, c.remove);

module.exports = router;
