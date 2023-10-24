function userRender(data) {
    try {
        const infoList = document.querySelector('#userInfo');
        const userRow = document.createElement('tbody');

        userRow.setAttribute('id', 'Ulist');   

        // Table that contains the user's details
        userRow.innerHTML = `
            <tr>
                <th>Name: </th>
                <td>${data.name}</td>
            </tr>
            <tr>
                <th>Email: </th>
                <td>${data.email ? data.name : 'N/A'}</td>
            </tr>
            <tr>
                <th>Username: </th>
                <td>${data.login ? data.login : 'N/A'}</td>
            </tr>
            <tr>
                
                <th>Location: </th>
                <td>${data.location? data.location : 'N/A'}</td>
            </tr>
            <tr>
                <th>Number of Gists: </th>
                <td>${data.public_gists}</td>
            </tr>
        `;
        infoList.appendChild(userRow);
        
    } catch (err) {
        console.log(err)
    }
}