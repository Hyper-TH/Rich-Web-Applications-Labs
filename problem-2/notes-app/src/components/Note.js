import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/NotesPage.css';

export const Note = (props) => {
    const [noteContent, setNoteContent] = useState(props.noteName);

    const handleChange = (event) => {
        setNoteContent(event.target.value);
    };

    const handleDoubleClick = async () => {
        await props.deleteNote(props.id);
    };

    const handleSaveNote = async () => {
        try {
            await Axios.post('http://localhost:8000/updateNote', {
                id: props.id,
                content: noteContent,
            });

            console.log('Note updated successfully');
        } catch (error) {
            console.error(`Axios Error: ${error}`);
        }
    };

    useEffect(() => {
        setNoteContent(props.noteName);
    }, [props.noteName]);

    return (
        <>
            <textarea
                className="note"
                value={noteContent}
                style={{ backgroundColor: `rgb${props.color}` }}
                onChange={handleChange}
                onBlur={handleSaveNote}
                onDoubleClick={handleDoubleClick}
            />
        </>
    );
};
