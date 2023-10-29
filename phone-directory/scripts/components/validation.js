// TODO: FIX EMAIL REG
// Regex values
const nameReg = /^[a-zA-Z\s]+$/;
const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const emailReg2 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;    // This regex allows a dot at the beginning and end

// Validation
document.querySelector('#phone-form').addEventListener('submit', (e) => {
    e.preventDefault(); // This stops re-rendering the error divs for some reason

    // Grab all user input
    const name = document.querySelector('#name').value;
    const num = document.querySelector('#num').value;
    const email = document.querySelector('#email').value;
    
    // If any of the fields are empty:
    if (name === '' || num == '' || email == '') {
        PhoneDirectory.Alert("error");
        PhoneDirectory.clearFields(); 
    // If name is > 20
    } else if (name.length > 20 ) {
        console.log('name-error: > 20');
        PhoneDirectory.Alert("name-error");
        PhoneDirectory.clearFields();
    // If name contains !(alpha/space only)
    } else if (!nameReg.test(name)) {
        console.log('name-error: !regex');
        PhoneDirectory.Alert("name-error"); 
        PhoneDirectory.clearFields(); 
    // If number passed is not a number || not equal to 10 
    } else if (isNaN(num) || num.length != 10) {
        console.log('num-error: !num || != 10');
        PhoneDirectory.Alert("num-error");
        PhoneDirectory.clearFields();
        PhoneDirectory.clearFields();
    // If email passed is >= 40 in length
    } else if (email.length >= 40 || !emailReg.test(email)) {
        console.log('email-error: >= 40 ');
        PhoneDirectory.Alert("email-error");
        PhoneDirectory.clearFields(); 
    } else {
        // Create instance of the class
        const book = new Phone(name, num, email);

        PhoneDirectory.addBook(book);
        Directory.addBook(book);

        alert('Details added sucessfully');

        // Resets all error messages
        var divs = document.getElementsByClassName("response");
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.display = 'none';
        }

        PhoneDirectory.clearFields();
    }
});
