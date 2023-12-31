// Clear fields for every search
function clearFields() {

    // If no user info found
    if (document.querySelectorAll('#Ulist tr').length == 0) {
        console.log(`No user info found`)
    } else {
        const u = document.getElementById('Ulist');
        u.remove();
    }

    // If no repo list found
    if (document.querySelectorAll('#Rlist tr').length == 0) {
        console.log(`No repos found`)
    } else {
        const r = document.getElementById('Rlist');
        while (r.firstChild) {
            r.removeChild(r.firstChild);
        }
    }
};