import Axios from 'axios';
import cors from 'cors';
import express from 'express';
import admin from 'firebase-admin';
import serviceAccount from './creds.json' assert { type: "json" };
import dotenv from 'dotenv';

dotenv.config();

const database_id = process.env.ID;


// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${database_id}.firebaseio.com/`
});

const firestore = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// Endpoint to get notes from Firestore
app.get('/getNotes', async (req, res) => {
    try {
        const collectionName = 'Notes';

        // Fetch all docuemnts from the "notes" collection
        const querySnapshot = await firestore.collection(collectionName).get();

        // Extract document data
        const documents = querySnapshot.docs.map((doc) => doc.data());

        res.json({ documents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Firebase Server Error` });
    }
});

// Endpoint to put new notes in Firestore
app.post('/putNotes', async (req, res) => {
    try {
        const { id, content, color } = req.body;

        if (!content) {
            return res.status(400).json({ error: `Note requires content to be added` })
        }

        const collectionName = 'Notes';

        const data = {
            id,
            content,
            color
        };

        // Add the note to the notes collection in Firestore
        await firestore.collection(collectionName).add(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Firebase Server Error` });
    }
});

// Start server
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});