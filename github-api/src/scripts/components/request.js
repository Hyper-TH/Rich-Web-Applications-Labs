const api_url='https://api.github.com/users';

function getResponse(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            if (response.status !== 200) {
                console.log("Error. Status Code: " + response.status);

                if (response.status == 404) {
                    alert('No user found');

                    return;
                }
                
                return; 
            }
            response.json().then(data => {
                resolve(data);
                console.log(data);
            });
        })
        .catch(function(err) {
            console.log("Fetch Error:", err);
            reject(err);
        });
    })
    
};
