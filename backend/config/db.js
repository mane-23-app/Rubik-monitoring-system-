const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb:27017/rubikdb';
    await mongoose.connect(mongoURI);
    console.log('✅ Conectado a MongoDB - Robot Rubik');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1); // Detiene la app si la base de datos falla
  }
};

module.exports = connectDB;