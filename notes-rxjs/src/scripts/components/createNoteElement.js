function createNoteElement(id, content, color) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Note";
    element.style.backgroundColor = color;

    // TODO: CONVERT TO RXJS (Observer)
    // Add event listener
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    // Event where user double clicks
    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
};