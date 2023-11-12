function createNoteElement(id, content, color) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Note";
    element.style.backgroundColor = color;

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    return element;
};