const router = require('express').Router();
const c = require('../controllers/siteController');
const { protect } = require('../middleware/auth');

router.get('/sitemap', c.getSitemap);                    // public XML
router.post('/sitemap/generate', protect, c.generateSitemap); // admin generate
router.get('/robots', c.getRobots);                      // public txt
router.get('/robots/admin', protect, c.getRobotsForAdmin);
router.put('/robots', protect, c.updateRobots);
router.get('/header-footer', protect, c.getHeaderFooter);
router.put('/header-footer', protect, c.updateHeaderFooter);

module.exports = router;
