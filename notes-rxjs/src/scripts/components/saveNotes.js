function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}