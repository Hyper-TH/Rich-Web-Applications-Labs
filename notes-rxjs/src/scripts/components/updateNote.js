function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];  // Return array of single element
    
    targetNote.content = newContent;
    saveNotes(notes);
}    
