async function findUser() { 
    try {
        let username = document.getElementById('username').value;
        const userData = await getResponse(`${api_url}/${username}`);
        const repoData = await getResponse(`${api_url}/${username}/repos`) 

        clearFields();

        // Display the main containers
        const userContainer = document.getElementById('userProfile');
        const repoContainer = document.getElementById('userRepos');
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.style.removeProperty('display');
        userContainer.style.display = 'block';
        repoContainer.style.display = 'block';
        userContainer.style.float = 'left';
        repoContainer.style.float = 'right';
    
        // Set avatar
        const avatar = document.getElementById('userAvatar');
        avatar.src = userData.avatar_url;

        // Render the containers
        userRender(userData);
        repoRender(repoData);
        
    } catch (err) {
        console.log(err)
    }
};

