const api_url='https://jsonplaceholder.typicode.com/posts';

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

async function useData() {
    const data = await getResponse(api_url);

    data.forEach(el => {
        let result = el.title.split(" ");

        if (result.length > 6) {
            console.log(el.id);
        }
    });
}

useData();
// Get all titles with values > 6


// Show word frequency map for all of the body contents of the posts