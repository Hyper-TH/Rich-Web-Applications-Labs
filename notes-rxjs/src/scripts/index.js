document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent } = rxjs;

    const notesContainer = document.getElementById("app");
    const addNoteButton = notesContainer.querySelector(".add-note");

    // Create stream
    const addNote$ = fromEvent(addNoteButton, 'click');
    // const delNote$ = fromEvent()

    // For each note, create an element for them
    getNotes().forEach((note) => {
        const noteElement = createNoteElement(note.id, note.content, note.color);
        notesContainer.insertBefore(noteElement, addNoteButton);
    });

    // Event listener for pressing plus button 
    // addNoteButton$addEventListener("click", () => addNote());
    addNote$.subscribe(() => {
        addNote();
    });


    // TODO: CONVERT TO RXJS
    // Event where user double clicks
    // element.addEventListener("dblclick", () => {
    //     const doDelete = confirm("Are you sure you want to delete this note?");

    //     if (doDelete) {
    //         deleteNote(id, element);
    //     }
    // });
});