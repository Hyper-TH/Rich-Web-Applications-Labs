// Clear fields for every search
function clearFields() {

    // If no user info found
    if (document.querySelectorAll('#Ulist tr').length == 0) {
        console.log(`No user info found`)
    } else {
        const u = document.getElementById('Ulist');
        u.remove();
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

async function findUser() { 
    try {
        let username = document.getElementById('username').value;
        const userData = await getResponse(`${api_url}/${username}`);
        const repoData = await getResponse(`${api_url}/${username}/repos`) 

        clearFields();

        // Display the main containers
        const userContainer = document.getElementById('userProfile');
        const repoContainer = document.getElementById('userRepos');

        userContainer.style.display = 'block';
        repoContainer.style.display = 'block';
    
        // Set avatars
        const avatar = document.getElementById('userAvatar');
        avatar.src = userData.avatar_url;

        userRender(userData);
        repoRender(repoData);
        
    } catch (err) {
        console.log(err)
    }
};

