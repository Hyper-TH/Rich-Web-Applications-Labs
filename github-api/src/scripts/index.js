const api_url='https://api.github.com/users';

// Clear fields for every search
function clearFields() {

    // If no user info found
    if (document.querySelectorAll('#userInfo tbody').length == 0) {
        console.log(`No user info found`)
    } else {
        const u = document.getElementById('userInfo');
        while (u.firstChild) {
            u.removeChild(u.firstChild);
        }
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
    try {
        let username = document.getElementById('username').value;

        clearFields();

        const data = await getResponse(`${api_url}/${username}`);

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

        const repoData = await getResponse(`${api_url}/${username}/repos`);
        const repoList = document.getElementById('Rlist');  // TBODY

        // Table that contains the repositories and its details
        repoData.forEach(el => {
            let repoName = document.createElement('tr');  
            let repoDesc = document.createElement('tr');

            repoName.innerHTML = `
                    <th style='border-right: 1px solid;'>Name: </th>
                    <td>${el.name ? el.name : 'N/A'}</td>
            `;
            repoDesc.innerHTML = `
                    <th style='
                            border-bottom: 1px solid;
                            border-right: 1px solid;'>
                        Description: 
                    </th>
                    <td style='border-bottom: 1px solid;'>${el.description ? el.description : 'No description found'}</td>
            `;
            repoList.appendChild(repoName);
            repoList.appendChild(repoDesc);

        });
        // TODO: REFER TO PHONE DIRECTORY ON HOW TO ADD DATA TO TABLE 
        // MULTIPLE TBODIES FOUND WITHIN USERREPO TABLE
        
        let wrapper = document.getElementById('repoTableWrapper');
        if (document.querySelectorAll('#Rlist tr').length > 10) {
            wrapper.style.display = 'block';
            wrapper.classList.add('add-scroll');
        } else {
            wrapper.style.display = 'none';
            wrapper.classList.remove('add-scroll');
        }

    } catch (err) {
        console.log(err)
    }
};

