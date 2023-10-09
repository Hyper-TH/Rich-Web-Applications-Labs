const notesContainer = document.getElementById("app"); /* Refer to the main div */
/*
    querySelector() returns first element within the document 
    that matches the specified selector/group of selectors
    If no matches are found, null is returned
*/
const addNoteButton = notesContainer.querySelector(".add-note"); 

// For each note, create an element for them
getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content, note.color);
    notesContainer.insertBefore(noteElement, addNoteButton);   // Insert before the add note button
});

// Function to generate random number
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
// Event listener for pressing plus button
addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
    // Get all notes stored in localstorage, if empty then load empty array
    // Convert JSON to native JS array
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    // Take in JS array and then stringify before saving it to localstorage
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content, color) {
    // Create var for a new textarea component
    const element = document.createElement("textarea");

    element.classList.add("note");              // Apply note class to this element
    element.value = content;                    // Apply content passed in
    element.placeholder = "Empty Note";
    element.style.backgroundColor = color;

    // Add event listener
    element.addEventListener("change", () => {
        updateNote(id, element.value);  // Most recently updated textarea content is passed
    });

    // Event where user double clicks
    element.addEventListener("dblclick", () => {
        // Check if user intended to delete
        const doDelete = confirm("Are you sure you want to delete this note?");

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote() {
    const randRed = randomNumber(0,250);
    const randBlue = randomNumber(0,250);
    const randGreen = randomNumber(0,250);

    // Get reference to all notes in local storage
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000), // There is a chance ID won't be unique
        content: "",
        color: `rgb(${randRed}, ${randBlue}, ${randGreen})`,
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content, noteObject.color);
    notesContainer.insertBefore(noteElement, addNoteButton);

    // persist the color
    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];  // Return array of single element
   
    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id); 

    saveNotes(notes);
    notesContainer.removeChild(element);
}