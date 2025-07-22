import express from 'express';
import connectToDatabase from '../utils/db.js';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  date: String,
  time: String,
  reason: String,
  treatment: String,
  doctors: [String],
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

app.post('/api/appointments', async (req, res) => {
  try {
    await connectToDatabase();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save appointment' });
  }
});

// 🔥 Export as serverless handler
export const handler = serverless(app);
