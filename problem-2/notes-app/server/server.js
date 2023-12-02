import Axios from 'axios';
import cors from 'cors';
import express from 'express';
import admin from 'firebase-admin';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// Start server
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});