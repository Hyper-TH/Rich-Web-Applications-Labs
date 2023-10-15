class Directory {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Directory.getBooks();
        books.push(book);
        
        localStorage.setItem('books', JSON.stringify(books));
    }
};
