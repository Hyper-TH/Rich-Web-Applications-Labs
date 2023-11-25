document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent, scan } = rxjs;
    const { Subject } = rxjs;

    const notesContainer = document.getElementById("app");
    const addNoteButton = notesContainer.querySelector(".add-note");

    const addNote$ = fromEvent(addNoteButton, 'click');

    //
    const rootNotes$ = new Subject();

    /* `Subject` is a type of observable that allows values to be pushed
        into the observable stream and let subscribers listen to the 
        values being pushed.*/


    // Subscribe to the add-note event
    addNote$.subscribe(() => {
        const noteID = randomNumber(1, 1000);   

        // Create a newNote instance, passing the random generated number
        const newNote = new Note(noteID);

        // Append to the container
        notesContainer.appendChild(newNote.element);

        // Emit new note to the stream of parent notes (rootNotes$)
        rootNotes$.next(newNote);
    });


    // Main observer
    const app$ = rootNotes$.pipe(

        // scan() manages the list of notes
        scan((acc, val) => {
            
            // If a new note is added
            if (val) {
                
                // Push to the accumulated (acc) list
                acc.push(val);

                // If new note has a parent (i.e., not root), add it as a child to the parent (i.e., adopt)
                if (val.parent) {
                    val.parent.addChild(val);
                }
            } 
            
            // If a note is deleted
            else {
                
                // If a note is deleted, pop and delete
                const deletedNote = acc.pop();
                if (deletedNote) {
                    deletedNote.delete();
                }
            }

            // Return the updated acc list of notes
            return acc;
        }, [])
    ).subscribe();

    // Refresh subscriptions on main observer page is unloaded
    window.addEventListener('beforeunload', () => {
        app$.unsubscribe();
    });
});

/*
scan((acc, val) => {
    // Logic here
}, [])

acc = accumulator
val = emitted value by observable

[] = initial value of the acc (which in this case is an empty array)
*/