async function findUser() { 
    try {
        let username = document.getElementById('username').value;
        const userData = await getResponse(`${api_url}/${username}`);
        const repoData = await getResponse(`${api_url}/${username}/repos`) 

        const noRepo = document.getElementById('noRepoResults');

        clearFields();

        // Display the main containers
        const userContainer = document.getElementById('userProfile');
        const repoContainer = document.getElementById('userRepos');
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.style.removeProperty('display');
        userContainer.style.display = 'block';
        repoContainer.style.display = 'block';
    
        // Set avatar
        const avatar = document.getElementById('userAvatar');
        avatar.src = userData.avatar_url;

        // Render the containers
        userRender(userData);

        if (!(repoData)) {
            console.log(`No repositories found`)
            noRepo.style.display = 'block';
        } else {
            noRepo.style.display = 'none';
            repoRender(repoData);
        }
        
    } catch (err) {
        console.log(err)
    }
};