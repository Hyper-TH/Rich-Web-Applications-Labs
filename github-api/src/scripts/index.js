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
    } catch (err) {
        console.log(err)
    }
};

