import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import cors from 'cors';

// Initialize dotenv for environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for the client domain (you can adjust this to your needs)
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to serve static files from client build
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Middleware to parse JSON requests
app.use(express.json());

// API Routes
app.use('/api/weather', routes);

// Fallback to serving the front-end index.html for other requests
app.get('*', (req, res) => {  // Removed unused `req`
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
