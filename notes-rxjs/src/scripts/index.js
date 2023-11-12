document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent } = rxjs;

    const notesContainer = document.getElementById("app");
    const addNoteButton = notesContainer.querySelector(".add-note");

    // Create stream
    const addNote$ = fromEvent(addNoteButton, 'click');
    const delNote$ = fromEvent(notesContainer, 'dblclick');

    // For each note, create an element for them
    getNotes().forEach((note) => {
        const noteElement = createNoteElement(note.id, note.content, note.color);
        notesContainer.insertBefore(noteElement, addNoteButton);
    });

    addNote$.subscribe(() => {
        addNote();
    });

    delNote$.subscribe((event) => {
        const noteElement = event.target;
        const id = noteElement.id;
        const doDelete = confirm("Are you sure you want to delete this note?");

        if (doDelete) {
            deleteNote(id, noteElement);
        }
    })
});