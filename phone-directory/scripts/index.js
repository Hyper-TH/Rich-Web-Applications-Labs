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

document.querySelector('#num-2').addEventListener('submit', (e) => {
    e.preventDefault(); 

    const inputNum = document.querySelector('#num-2').value;
    const table = document.querySelector('#search-results');

    let books = Directory.getBooks();
    let searched = false;

    // Search number 
    books.forEach(book => {
        if(book.num == inputNum) {
            PhoneDirectory.findBook2();

            table.style.display = 'table';
            noResult.style.display = 'none';

            searched = true;
        }
    });
    
    if (!searched) {
        const noResult = document.querySelector('#noResult');
        noResult.style.display = 'block';
    }

});

function findBook2() {
    const inputNum = document.querySelector('#num-2').value;
    const table = document.querySelector('#search-results');
    // const list = document.querySelector('#Nlist');
    const row = document.createElement('tbody');

    let books = Directory.getBooks();
    let searched = false;

    // Search number 
    books.forEach(book => {
        
        if((book.num).includes(inputNum)) {

            table.style.display = 'table';
            noResult.style.display = 'none';

            if (isOdd(book.num)) {
                row.innerHTML += `
                    <tr>
                        <td style="background-color: #f2f2f2">${book.name}</td>
                        <td style="background-color: #f2f2f2">${book.num}</td>
                        <td style="background-color: #f2f2f2">${book.email}</td>
                    </tr>
                `;
            } else {
                row.innerHTML += `
                <tr>
                    <td>${book.name}</td>
                    <td>${book.num}</td>
                    <td>${book.email}</td>
                </tr>
                `;
            }
            table.appendChild(row);

            searched = true;
        }

        // should append at the end of the loop
    });
    
    if (!searched) {
        const noResult = document.querySelector('#noResult');
        noResult.style.display = 'block';
    }

    
}


// function findBook2() {
//     const inputNum = document.querySelector('#num-2').value;
//     const table = document.querySelector('#search-results');

//     let books = Directory.getBooks();
//     let searched = false;

//     // Search number 
//     books.forEach(book => {
//         if(book.num == inputNum) {
//             PhoneDirectory.findBook2();

//             table.style.display = 'table';
//             noResult.style.display = 'none';

//             searched = true;
//         }
//     });
    
//     if (!searched) {
//         const noResult = document.querySelector('#noResult');
//         noResult.style.display = 'block';
//     }
// }

// TODO: Another click would sort it in descending order
function sortTable(n) {
    var table;
    var rows;
    var switching;
    var i;
    var x;
    var y;
    var shouldSwitch;
    var dir;
    var switchCount = 0;
    table = document.getElementById("contacts");
    switching = true;

    // Set sorting direction to asc
    dir = "asc";

    // loop to continue until no switching done
    while(switching) {
        switching = false;
        rows = table.rows;

        // loop through table rows minusing the table headers
        for(i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            // Get two elements to compare, from curr row to next row
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // Check if two rows should switch, based on asc or desc
            if (dir == "asc") {
                if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                } // End inner if
            } else if (dir == "desc") {
                if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                } 
            } 
        };

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

            switchCount++;
        } else {
            if(switchCount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            } 
        };
    } 
};