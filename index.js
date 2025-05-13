// Import required modules and middleware
const express = require('express');
const morgan = require('morgan'); // HTTP request logger: middleware
const rateLimit = require('express-rate-limit'); // Rate Limiting: middleware
const logger = require('./middleware/logger'); // Custom request logger

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(morgan('dev'));
// Limit each IP to 10 requests per minute
app.use(rateLimit({ windowMs: 60 * 1000, max: 10}));
app.use(logger);

// Placeholder for Pokémon data fetching route
const pokemonRoutes = require('./routes/pokemon');

// Placeholder for story generation route
const storyRoutes = require('./routes/story');

// Register routes with base paths
app.use('/pokemon', pokemonRoutes)
app.use('/story', storyRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
