const api_url='https://api.github.com/users';

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

        const list = document.querySelector('#Ulist');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.login}</td>
            <td>${data.email}</td>
            <td>${data.location}</td>
            <td>${data.public_gists}</td>
        `;
        list.appendChild(row);

        const repoData = await getResponse(`${api_url}/${username}/repos`);
        console.log(repoData);

        const repoList = document.querySelector('#Rlist');
        
        repoData.forEach(el => {
            console.log(el);
            let repoRow = document.createElement('tr');
            repoRow.innerHTML = `
                <td>${el.name}</td>
                <td>${el.description}</td>
            `;
            repoList.appendChild(repoRow);
        });


    } catch (err) {
        console.log(err)
    }
};

