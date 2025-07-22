import express from 'express';
import connectToDatabase from '../utils/db.js';
import mongoose from 'mongoose';
import cors from 'cors';

// Setup Express
const app = express();
app.use(cors({ origin: '*' })); // or restrict to your domain
app.use(express.json()); // to parse JSON

// Define schema
const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  date: String,
  time: String,
  reason: String,
  treatment: String,
  doctors: [String]
});

// Model
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

// POST endpoint
app.post('/api/appointments', async (req, res) => {
  try {
    await connectToDatabase();

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment saved successfully' });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default app;
