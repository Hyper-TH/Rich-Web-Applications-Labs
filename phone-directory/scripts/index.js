// Regex values
const nameReg = /^[a-zA-Z\s]+$/;
const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Once DOM is loaded, display data
document.addEventListener('DOMContentLoaded', PhoneDirectory.displayBooks);

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
    // If name is > 20
    } else if (name.length > 20 ) {
        console.log('name-error: > 20');
        PhoneDirectory.Alert("name-error");
        PhoneDirectory.clearFields();
    // If name contains !(alpha/space only)
    } else if (!nameReg.test(name)) {
        console.log('name-error: !regex');
        PhoneDirectory.Alert("name-error"); // TODO: Create a different val error for this
        PhoneDirectory.clearFields(); 
    // If number passed is not a number || not equal to 10 
    } else if (isNaN(num) || num.length != 10) {
        console.log('num-error: !num || != 10');
        PhoneDirectory.Alert("num-error");
        PhoneDirectory.clearFields();
        PhoneDirectory.clearFields();
    // If email passed is not a valid email || >= 40 in length
    } else if (email.length >= 40 || !(emailReg.test(email))) {
        console.log('email-error: !regex || >= 40 ');
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

document.querySelector('#search').addEventListener('submit', (e) => {
    e.preventDefault(); 

    const inputNum = document.querySelector('#num-2').value;
    const searchList = document.querySelector('#Nlist');
    const noResult = document.querySelector('#noResult');

    let books = Directory.getBooks();
    let searched = false;

    // TODO: Odd numbers should have #f2f2f2 as their background color
    books.forEach(book => {
        if(book.num == inputNum) {
            // insert element here
            searchList.style.display = 'block';
            const rows = document.createElement('tr');
            rows.innerHTML = `
            <tr>
                <th> Name </tj>
                <th> Phone Number </tj>
                <th> Email </tj>
            </tr>
                <td>${book.name}</td>
                <td>${book.num}</td>
                <td>${book.email}</td>
            `;
            searchList.appendChild(rows);
            noResult.style.display = 'none';
            searched = true;
        }
    });
    
    if (!searched) {
        searchList.style.display = 'none';
        noResult.style.display = 'block';
    }

});

// TODO: Delete entries
// document.querySelector('#Plist').addEventListener('click', (e) => {
//     PhoneDirectory.deleteBook(e.target);

//     Directory.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
//     PhoneDirectory.Alert("remove");
// });

// Sort the table (bubble sort)
// TODO: Another click would sort it in descending order
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