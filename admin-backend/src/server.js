require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pages', require('./routes/pages'));
app.use('/api/pages/:pageId/sections', require('./routes/sections'));
app.use('/api/media', require('./routes/media'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/nav', require('./routes/nav'));
app.use('/api/team', require('./routes/team'));
app.use('/api/client-logos', require('./routes/clientLogos'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/site', require('./routes/site'));
app.use('/api/redirects', require('./routes/redirects'));

// Handle active redirects before serving anything
const { handleRedirects } = require('./controllers/redirectController');
app.use(handleRedirects);

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

// Start HTTP server immediately — don't block on DB connection
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

// Connect DB with retry — server stays up even if DB is not yet configured
async function connectDB(retryDelay = 10000) {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database connected and synced');
  } catch (err) {
    console.error('DB connection failed:', err.message, '— retrying in', retryDelay / 1000, 's');
    setTimeout(() => connectDB(Math.min(retryDelay * 1.5, 60000)), retryDelay);
  }
}

connectDB();
