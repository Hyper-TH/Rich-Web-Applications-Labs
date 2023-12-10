import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Note } from '../components/Note';  
import hyper from '../assets/hyper.png'
import '../styles/NotesPage.css';

export const NotesPage = ({ subPageName, backTo }) => {
    const [notesList, setNoteList] = useState([]);
    const [error, setError] = useState("");
    const [newNote, setNewNote] = useState("");

    // Function to generate random number
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const fetchNotes = async () => {
        try {
            const response = await Axios.get(`http://localhost:8000/getNotes`);

            if (response.data && response.data.documents) {
                setNoteList(response.data.documents);
                setError("");
            } else {
                setError("Error retrieving note");
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            setError("Local Server Error");
        }
    };

    useEffect(() => {
        console.log("Fetching notes...");
        fetchNotes();
    }, []); // Empty dependency array to ensure it only runs once

    const handleChange = (event) => {
        setNewNote(event.target.value);
    };

    const addNote = async () => {
        const note = {
            id: randomNumber(1, 10000),
            content: newNote,
            color: `(${randomNumber(1, 255)},${randomNumber(1, 250)},${randomNumber(1, 250)})`,
        };
    
        try {
            // Add the new note
            await Axios.post(`http://localhost:8000/putNotes`, {
                id: note.id,
                content: note.content,
                color: note.color
            });

            console.log(`Attempting to fetch notes now..`);
            await fetchNotes();

        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Local Server Error");
        }
    
    };

    const deleteNote = async (id) => {
        try {
            // Delete note
            await Axios.post(`http://localhost:8000/deleteNote`, {
                id: id
            });

            console.log(`Attempting to fetch notes now..`);

            // Fetch updated notes
            await fetchNotes();

        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Local Server Error");
        }
    };

    return (
        <>
        <div id='notesMockBody'>
            <div id="header">
                <div id="logo">
                    <img src={hyper} />
                </div>
                <h1>Hyper's notes app</h1>
            </div>
            
            <button className="button">
                    <Link to={backTo}>Back to Home</Link>
            </button>
            
            <div className="addNote">
                <input type="text" className="input-box" onChange={handleChange} />
                <button className="button" onClick={addNote}>Add Note</button>
            </div>



            <div id="app">
                    {notesList.map((note) => {
                        return (
                            <Note
                                key={note.id}
                                noteName={note.content}
                                id={note.id}
                                color={note.color}
                                deleteNote={deleteNote}
                            />
                        );
                    })}
            
            </div>
        </div>
        </>
    );
};
