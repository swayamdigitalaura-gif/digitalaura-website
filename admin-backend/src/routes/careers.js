const router = require('express').Router();
const c = require('../controllers/careerController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', c.getAll);                                       // public
router.get('/:id', c.getOne);                                    // public
router.post('/', protect, c.create);
router.put('/:id', protect, c.update);
router.delete('/:id', protect, c.remove);

// Applications
router.get('/:id/applications', protect, c.getApplications);
router.post('/:id/apply', upload.single('cv'), c.applyPublic);   // public
router.put('/:id/applications/:appId', protect, c.updateApplicationStatus);

module.exports = router;
