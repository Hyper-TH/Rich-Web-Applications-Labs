// Once DOM is loaded, display data
document.addEventListener('DOMContentLoaded', PhoneDirectory.displayBooks);

// Validation
document.querySelector('#phone-form').addEventListener('submit', () => {
    // e.preventDefault();

    // Grab all user input
    const name = document.querySelector('#name').value;
    const num = document.querySelector('#num').value;
    const email = document.querySelector('#email').value;

    if (name === '' || num == '' || email == '') {
        PhoneDirectory.Alert("error");
    } else if (name.length >= 20) {
        PhoneDirectory.Alert("name-error");
        PhoneDirectory.clearFields();
    } else if (isNaN(num)) {
        PhoneDirectory.Alert("num-error");
        PhoneDirectory.clearFields();
    } else if (email.length >= 40) {
        PhoneDirectory.Alert("email-error");
        PhoneDirectory.clearFields();
    } else {
        // Create instance of the class
        const book = new Phone(name, num, email);

        PhoneDirectory.addBook(book);
        Directory.addBook(book);

        alert('Details added sucessfully');

        PhoneDirectory.clearFields();
    }
});

document.querySelector('#Plist').addEventListener('click', (e) => {
    PhoneDirectory.deleteBook(e.target);

    Directory.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    PhoneDirectory.Alert("remove");
});

