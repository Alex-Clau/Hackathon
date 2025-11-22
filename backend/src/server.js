import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import initRoutes from './routes/initRoutes.js';
import companiesRoutes from './routes/companiesRoutes.js';
import offersRoutes from './routes/offersRoutes.js';
import userOffersRoutes from './routes/userOffersRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve static files from public directory (before API routes to avoid 404 handler)
// __dirname is backend/src, so we go up one level to backend, then into public/images
const staticPath = join(__dirname, '../public/images');
console.log('Static files path:', staticPath);
app.use('/images', express.static(staticPath, {
  setHeaders: (res, path) => {
    if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/png');
    }
  }
}));

// API routes
app.use('/api/companies', companiesRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/users', userOffersRoutes);

// Initialization routes
app.use('/api/init', initRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// 404 handler (must be last)
app.use((req, res) => {
  // Don't return 404 for image requests that might be handled by static
  if (req.path.startsWith('/images/')) {
    return res.status(404).send('Image not found');
  }
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

