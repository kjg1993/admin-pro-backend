const mongoose = require('mongoose');

async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error by connecting the DB:', error);
    throw new Error('Error by connecting the DB');
  }
}

module.exports = { dbConnection };