class PhoneDirectory {
    static displayBooks() {
        const books = Directory.getBooks();

        books.forEach((book) => PhoneDirectory.addBook(book));
    };

    static addBook(book) {
        const list = document.querySelector('#Plist');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.num}</td>
            <td>${book.email}</td>
        `;
        ;
        list.appendChild(row);
    };

    static Alert(message) {
        var x = document.getElementById(message);
        x.style.display = "block";
        setTimeout(() => x.style.display = 'none', 3000);
    };

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#num').value = '';
        document.querySelector('#email').value = '';
    };
};  