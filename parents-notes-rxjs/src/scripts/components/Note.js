const { fromEvent } = rxjs;

class Note {

    // Note constructor
    constructor(id, parent = null) {
        this.id = id;
        this.parent = parent;
        this.children = [];

        // If it's a parent/child, set a specific content
        if (parent) {
            this.content = `This is ${id} : Child of (${parent.content}) `;
        } 

        // Else if ROOT parent (i.e., top level)
        else {
            this.content = `Note ${id}`;    // Just the ID
        };

        // Create a DIV element for the note
        this.element = document.createElement('div');
        this.element.id = id;

        // Have each note have their own buttons
        this.element.innerHTML = `<p>${this.content}</p> 
                                <button class="delete-btn"> Delete </button>                    
                                <button class="add-descendant-btn"> Add Descendant </button>`;

        // Create observers for the buttons
        this.deleteButton$ = fromEvent(this.element.querySelector('.delete-btn'), 'click');
        this.addDescendantButton$ = fromEvent(this.element.querySelector('.add-descendant-btn'), 'click');

        // Create streams
        this.deleteButton$.subscribe(() => this.delete());
        this.addDescendantButton$.subscribe(()  => this.addDescendant());

    }; // end constructor()

    // Add child method
    addChild(child) {
        this.children.push(child);
        this.element.appendChild(child.element);
    };

    // Add descendant method
    addDescendant() {
        const noteID = randomNumber(1, 1000);
        const descendant = new Note(noteID, this);

        this.addChild(descendant);
    };

    // Delete notes and its descendants method
    delete() {

        // Recursive deletion (iterate through all children of current note until it reaches a leaf node)
        this.children.forEach(child => child.delete());

        // If current note has a parent, remove itself from the parent's children (i.e., disown itself)
        // The filter() creates a new array excluding current note
        if (this.parent) {
            this.parent.children = this.parent.children.filter(c => c.id !== this.id);
        };

        // Remove DOM element
        this.element.remove();
    };
};