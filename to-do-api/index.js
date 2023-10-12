const api_url='https://jsonplaceholder.typicode.com/posts';

async function getResponse(api_url) {
    
    // Store response
    const response = await fetch(api_url);

    // Store data in form of JSON
    var data = await response.json();

    console.log(data);
};

getResponse(api_url);
// Get all titles with values > 6


// Show word frequency map for all of the body contents of the posts