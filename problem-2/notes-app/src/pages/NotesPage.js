import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Note } from '../components/Note';  

export const NotesPage = ({subPageName, backTo}) => {
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
    }, []);

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
            // Fetch notes first
            await fetchNotes();
    
            // Add the new note
            await Axios.post(`http://localhost:8000/putNotes`, {
                id: note.id,
                content: note.content,
                color: note.color
            });
        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Local Server Error");
        }
    
        // Update the state after fetching notes
        setNoteList([...notesList, note]);
    };

    const deleteNote = (id) => {
        setNoteList(notesList.filter((note) => note.id !== id));
    };

    return (
        <>
        <div className="App">
            <div className="addNote">
                <input type='text' onChange={handleChange} />
                <button onClick={addNote}>Add Note</button>
            </div>

            <div className="container">
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
            <button>
                <Link to={backTo}>Back to Home</Link>
            </button>
        </div>
    </>
    );
};