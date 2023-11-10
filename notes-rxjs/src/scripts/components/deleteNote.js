function deleteNote(id, element) {
    const notesContainer = document.getElementById("app");
    
    const notes = getNotes().filter((note) => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}
