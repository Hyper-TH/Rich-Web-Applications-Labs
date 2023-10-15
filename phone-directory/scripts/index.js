// Once DOM is loaded, display data
document.addEventListener('DOMContentLoaded', PhoneDirectory.displayBooks);

// Validation
document.querySelector('#phone-form').addEventListener('submit', (e) => {
    e.preventDefault(); // This stops re-rendering the error divs for some reason

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

        // Resets all error messages
        var divs = document.getElementsByClassName("response");
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.display = 'none';
        }

        PhoneDirectory.clearFields();
    }
});

document.querySelector('#Plist').addEventListener('click', (e) => {
    PhoneDirectory.deleteBook(e.target);

    Directory.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    PhoneDirectory.Alert("remove");
});

// Sort the table (bubble sort)
function sortTable(n) {
    var table, rows;
    var switching;
    var shouldSwitch;
    var dir;
    var switchCount;
    table = document.getElementById('contacts');
    switching = true;

    // Initially sort to asc (true)
    dir = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        // Loop through table rows (excluding table headers)
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            // Get two el to compare, curr row to next row
            let x = rows[i].getElementsByTagName("td")[n];
            let y = rows[i + 1].getElementsByTagName("td")[n];

            // Check if they should switch
            if (dir) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (!dir) {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            
            switchCount++;
        } else {
            if (switchCount == 0 && dir) {
                dir = false;
                switching = true;
            }
        }
    }
};