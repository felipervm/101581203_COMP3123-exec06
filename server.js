require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

const DB_URL = process.env.DB_URL || '';
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('<h1>Welcome to Note taking application - Week06 Exercise</h1>');
});

app.use('/api', noteRoutes);

async function startServer() {
  try {
    if (!DB_URL) {
      throw new Error('DB_URL is missing. Add your MongoDB Atlas connection string to .env');
    }

    await mongoose.connect(DB_URL);
    console.log('Successfully connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
      console.log(`API base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Could not connect to the database. Exiting now...', error.message);
    process.exit(1);
  }
}

startServer();
