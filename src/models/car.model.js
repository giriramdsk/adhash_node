// Import Mongoose
const mongoose = require('mongoose');

// Define the Car schema
const carSchema = new mongoose.Schema({
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  trim: { type: String },
  engine: { type: String },
  status: { type: Number }
});

// Define the Car model
const Car = mongoose.model('Car', carSchema);

// Export the Car model
module.exports = Car;
