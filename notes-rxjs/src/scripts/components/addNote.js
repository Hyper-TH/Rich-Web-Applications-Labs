function addNote() {
    const notesContainer = document.getElementById("app");
    const addNoteButton = notesContainer.querySelector(".add-note");
    
    const randRed = randomNumber(0, 250);
    const randBlue = randomNumber(0, 250);
    const randGreen = randomNumber(0, 250);

    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
        color: `rgb(${randRed}, ${randBlue}, ${randGreen})`
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content, noteObject.color);

    // Attach noteObject to the noteElement
    noteElement.noteObject = noteObject;

    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}