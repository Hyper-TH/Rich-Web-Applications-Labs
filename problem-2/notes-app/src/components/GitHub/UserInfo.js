import '../../styles/GitHubPage.css';

export const UserInfo = (props) => {
    return <>    
       <div id='userProfile'>
            <h1> User Profile </h1>
            <img src={props.avatar}/>        
            <table id='userInfo'>                
                <tbody id='Ulist'>
                    <tr>
                        <th>Name: </th>
                        <td>{props.name}</td>
                    </tr>
                    <tr>
                        <th>Email: </th>
                        <td>{props.email}</td>
                    </tr>
                    <tr>
                        <th>Username: </th>
                        <td>{props.login}</td>
                    </tr>
                    <tr>
                        <th>Location: </th>
                        <td>{props.location}</td>
                    </tr>
                    <tr>
                        <th>Number of Gists: </th>
                        <td>{props.numOfGists}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
};


