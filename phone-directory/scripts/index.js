// Regex values
const nameReg = /^[a-zA-Z\s]+$/;
const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Once DOM is loaded, display data
document.addEventListener('DOMContentLoaded', PhoneDirectory.displayBooks);

// Clear fields
function clearFields() {
    if (document.querySelectorAll('#contacts tbody').length == 0) {
        console.log(`empty`)

    } else {
        const u = document.getElementById('Plist');
        u.remove();
    }
}

// TODO: Fix ERROR DIV containers
// TODO: Improve no results div

function findBook2() {

    clearFields();

    const inputNum = document.querySelector('#num-2').value;
    const table = document.querySelector('#contacts');
    const row = document.createElement('tbody');
    row.setAttribute('id', 'Plist');

    let books = Directory.getBooks();
    let searched = false;
    let counter = 0;

    // Search number 
    books.forEach(book => {
    
        if((book.num).includes(inputNum)) {

            table.style.display = 'table';
            noResult.style.display = 'none';

            if (isOdd(counter)) {
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
            counter = counter + 1;
            searched = true;
        } 

    });
    
    if (!searched) {
        const noResult = document.querySelector('#noResult');
        noResult.style.display = 'block';
        table.style.display = 'none';
    }
}

// TODO: Make every odd row colored
function sortTable(n) {
    var table, rows;
    var switching = true;
    var i, x, y;
    var shouldSwitch;
    var dir;
    var switchCount = 0;

    table = document.getElementById("contacts");

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