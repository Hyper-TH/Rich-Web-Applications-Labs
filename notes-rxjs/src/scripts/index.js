document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent, map } = rxjs;

    const notesContainer = document.getElementById("app");
    const addNoteButton = notesContainer.querySelector(".add-note");

    // Create stream
    const addNote$ = fromEvent(addNoteButton, 'click');
    const delNote$ = fromEvent(notesContainer, 'dblclick');
    const updNote$ = fromEvent(notesContainer, 'input').pipe(
        map((event) => {

            const noteId = event.target.noteObject.id;
            const value = event.target.value;

            return {
                id: noteId,
                value: value
            };
        })
    );

    // For each note, create an element for them
    getNotes().forEach((note) => {
        const noteElement = createNoteElement(note.id, note.content, note.color);
        noteElement.noteObject = note;
        notesContainer.insertBefore(noteElement, addNoteButton);
    });

    addNote$.subscribe(() => {
        addNote();
    });

    delNote$.subscribe((event) => {
        const noteElement = event.target;
        const id = noteElement.noteObject.id;
        const doDelete = confirm("Are you sure you want to delete this note?");

        if (doDelete) {
            deleteNote(id, noteElement);
        }
    });

    updNote$.subscribe(({ id, value }) => {
        updateNote(id, value);
    });
});