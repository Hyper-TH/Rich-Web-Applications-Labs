function repoRender(data) {
    try {
        const repoList = document.getElementById('Rlist');  // TBODY

        // Table that contains the repositories and its details
        data.forEach(el => {
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

        // ADD SCROLL
        let wrapper = document.getElementById('repoTableWrapper');
        if (document.querySelectorAll('#Rlist tr').length >= 10) {
            wrapper.style.display = 'block';
            wrapper.classList.add('add-scroll');
        } else {
            wrapper.style.display = 'none';
            wrapper.classList.remove('add-scroll');
        }
    } catch (err) {
        console.log(err);
    }
}