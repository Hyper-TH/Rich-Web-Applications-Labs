document.addEventListener('DOMContentLoaded', () => {
    const { range, filter, map, Observable, fromEvent, interval } = rxjs;

    const notesContainer = document.getElementById("app");
    const addNoteButton = notesContainer.querySelector(".add-note");

    // FOr each note, create an element for them
    getNotes().forEach((note) => {
        const noteElement = createNoteElement(note.id, note.content, note.color);
        notesContainer.insertBefore(noteElement, addNoteButton);
    });

    // TODO: CONVERT TO RXJS (Observer)
    // Event listener for pressing plus button 
    addNoteButton.addEventListener("click", () => addNote());

        // interval observer
        // const interval$ = interval(1000);

        // interval$.subscribe(val => console.log(val));
});