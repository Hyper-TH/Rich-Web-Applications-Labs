function createNoteElement(id, content, color) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Note";
    element.style.backgroundColor = color;
    
    return element;
};