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

/* START NOTE ENDPOINTS */
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

        res.json({ message: 'Note added successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Firebase Server Error` });
    }
});

// Endpoint to delete a note from Firestore
app.post('/deleteNote', async (req, res) => {
    try {
        const { id } = req.body;
        console.log(`Got id: ${id}`);

        if (!id) {
            return res.status(400).json({ error: 'Note ID is required for deletion' });
        }

        const collectionName = 'Notes';

        // Find and delete the note from the notes collection in Firestore based on the 'id' field
        const notesRef = firestore.collection(collectionName);
        const querySnapshot = await notesRef.where('id', '==', id).get();

        if (querySnapshot.empty) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Assuming there's only one document with the given 'id', delete it
        const doc = querySnapshot.docs[0];
        await doc.ref.delete();

        res.json({ message: 'Note deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Firebase Server Error' });
    }
});

// Endpoint to update a note in Firestore
app.post('/updateNote', async (req, res) => {
    try {
        const { id, content } = req.body;

        console.log(`Got: ${id}, ${content}`);

        if (!content) {
            return res.status(400).json({ error: `Note requires content to be updated`});
        }

        const collectionName = 'Notes';

        const notesRef = firestore.collection(collectionName);
        const querySnapshot = await notesRef.where('id', '==', id).get();

        if (querySnapshot.empty) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const doc = querySnapshot.docs[0];
        await doc.ref.update({ content });

        res.json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Firebase Server Error' });
    }
});
/* END NOTE ENDPOINTS */

/* START EXCUSE ENDPOINTS */
// endpoint to generate an excuse
app.get('/excuse', async (req, res) => {
    try {
        const { category } = req.query;
    
        if (!category) {
            return res.status(400).json({ error: 'Category is required '});
        }
    
        const apiURL = `https://excuser-three.vercel.app/v1/excuse/${category}`;
        const response = await Axios.get(apiURL);

        console.log(response.data);  // Display the response data
        res.json(response.data);     // Send the response data to the client

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/getExcuses', async (req, res) => {
    try {
        const collectionName = 'Excuses';

        // Fetch all documents from the "excuses" collection
        const querySnapshot = await firestore.collection(collectionName).get();

        // Extract document data
        const documents = querySnapshot.docs.map((doc) => doc.data());

        res.json({ documents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
});

app.post('/putExcuse', async (req, res) => {
    try {
        const { excuse, category } = req.body;

        if(!excuse) {
            return res.status(400).json({ error: 'Excuse is required' });
        }

        const collectionName = 'Excuses';

        // Add the excuse to the "excuses" collection in Firestore
        await firestore.collection(collectionName).add({
            category,
            excuse
        });

        res.json({ message: 'Excuse added to Firestore succcessfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
});
/* END EXCUSE ENDPOINTS */

// Start server
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});