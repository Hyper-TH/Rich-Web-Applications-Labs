//check if the number is odd
function isOdd (number) {
    return number % 2 !== 0;
}

class PhoneDirectory {
    static displayBooks() {
        const books = Directory.getBooks();

        books.forEach((book) => PhoneDirectory.addBook(book));
    };

    static addBook(book) {
        const list = document.querySelector('#Plist');
        const row = document.createElement('tr');

        if (isOdd(book.num)) {
            row.innerHTML = `
                <td style="background-color: #f2f2f2">${book.name}</td>
                <td style="background-color: #f2f2f2">${book.num}</td>
                <td style="background-color: #f2f2f2">${book.email}</td>

            `;
        } else {
            row.innerHTML = `
                <td>${book.name}</td>
                <td>${book.num}</td>
                <td>${book.email}</td>
            `;
        }
        list.appendChild(row);

    };

    static findBook(book) {
        const list = document.querySelector('#Nlist');
        const row = document.createElement('tr');

        if (isOdd(book.num)) {
            row.innerHTML = `
                <td style="background-color: #f2f2f2">${book.name}</td>
                <td style="background-color: #f2f2f2">${book.num}</td>
                <td style="background-color: #f2f2f2">${book.email}</td>
            `;
        } else {
            row.innerHTML = `
                <td>${book.name}</td>
                <td>${book.num}</td>
                <td>${book.email}</td>
            `;
        }
        list.appendChild(row);
    }
     
    static Alert(message) {
        var divs = document.getElementsByClassName("response");
        console.log(divs);
        for (let i = 0; i < divs.length; i++) {
            if(divs[i].id != message) {
                divs[i].style.display = 'none';
            } else {
                divs[i].style.display = 'block';
            }
        }
    };  

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#num').value = '';
        document.querySelector('#email').value = '';
    };
};  