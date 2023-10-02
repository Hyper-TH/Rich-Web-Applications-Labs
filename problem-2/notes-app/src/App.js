import './App.css';
import { useState } from 'react';
import { Note } from './Note';

function App() {
	const [notesList, setNoteList] = useState([]);
	const [newNote, setNewNote] = useState();

	const handleChange = (event) => {
		setNewNote(event.target.value);
	};

	const addNote = () => {
		const note = {
			id: notesList.length === 0 ? 1 : notesList[notesList.length - 1].id + 1,
			noteName: newNote,
			complete: false
		}

		setNoteList([...notesList, note])
	};


	const deleteNote = (id) => {
		setNoteList(notesList.filter((note) => note.id !== id));
	};

	const updateNote = (id) => {
		setNoteList(notesList.map((note) => { return note.id === id ? {...note, completed: true} : note;}))
	};

	return (
		<div className="App">
			<div className="addNote">
				<input type='text' onChange={handleChange} />
				<button onClick={addNote}>Add Note</button>
			</div>

			<div className="container">
				{notesList.map((note) => {
					return (
						<Note	
							noteName={note.noteName}
							id={note.id}
							completed={note.completed}
							deleteNote={deleteNote}
							updateNote={updateNote}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
