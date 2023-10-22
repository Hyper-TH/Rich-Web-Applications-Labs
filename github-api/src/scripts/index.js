const api_url='https://api.github.com/users';

// Attempt clear fields for every search
function clearFields() {
    document.querySelector('#userInfo').empty();
    document.querySelector('#repoInfo').empty();
};

function getResponse(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            if (response.status !== 200) {
                console.log("Error. Status Code: " + response.status);
                return; 
            }

            response.json().then(data => {
                resolve(data);
            });
        })
        .catch(function(err) {
            console.log("Fetch Error:", err);
            reject(err);
        });
    })
    
};

async function findUser() { 
    let username = document.getElementById('username').value;
    try {

        const data = await getResponse(`${api_url}/${username}`);
        console.log(data);

        const avatar = document.getElementById('userAvatar');
        avatar.src = data.avatar_url;

        const infoList = document.querySelector('#userInfo');
        const userRow = document.createElement('tbody');

        // Table that contains the user's details
        userRow.innerHTML = `
            <tr>
                <th>Name: </th>
                <td>${data.name}</td>
            </tr>
            <tr>
                <th>Email: </th>
                <td>${data.email}</td>
            </tr>
            <tr>
                <th>Username: </th>
                <td>${data.login}</td>
            </tr>
            <tr>
                
                <th>Location: </th>
                <td>${data.location}</td>
            </tr>
            <tr>
                <th>Number of Gists: </th>
                <td>${data.public_gists}</td>
            </tr>
        `;
        infoList.appendChild(userRow);

        const repoData = await getResponse(`${api_url}/${username}/repos`);
        const repoList = document.querySelector('#repoInfo');
        
        // Table that contains the repositories and its details
        repoData.forEach(el => {
            let repoRow = document.createElement('tbody');  // Every repo is a body
            repoRow.innerHTML = `
                <tr>
                    <th>Name: </th>
                    <td>${el.name}</td>
                </tr>    
                <tr>
                    <th>Description: </th>
                    <td>${el.description}</td>
                </tr>
            `;
            repoList.appendChild(repoRow);
        });


    } catch (err) {
        console.log(err)
    }
};

