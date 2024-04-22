// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 3000; // You can change this port as needed

// Dummy data for doctors and appointments
let doctors = [
    { id: 1, name: 'Dr. John Doe', specialty: 'General Medicine', maxPatients: 10 },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatology', maxPatients: 8 }
];

let appointments = [];

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Outpatient Appointment System');
});

// Endpoint to get list of all doctors
app.get('/api/doctors', (req, res) => {
    res.json(doctors);
});

// Endpoint to get details of a specific doctor
app.get('/api/doctors/:doctorId', (req, res) => {
    const doctorId = parseInt(req.params.doctorId);
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
});

// Endpoint to get availability of a specific doctor
app.get('/api/doctors/:doctorId/availability', (req, res) => {
    const doctorId = parseInt(req.params.doctorId);
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
    }
    // Dummy implementation for availability, you would implement logic here to check real availability
    res.json({ doctor, availableSlots: ['2024-04-23 18:00', '2024-04-24 18:00'] });
});

// Endpoint to book an appointment
app.post('/api/appointments/book', (req, res) => {
    const { doctorId, patientName, appointmentDateTime } = req.body;
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
    }
    if (appointments.filter(appt => appt.doctorId === doctorId).length >= doctor.maxPatients) {
        return res.status(400).json({ error: 'Doctor is fully booked' });
    }
    appointments.push({ doctorId, patientName, appointmentDateTime });
    res.status(201).json({ message: 'Appointment booked successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
