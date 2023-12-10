import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UserInfo } from '../components/GitHub/UserInfo';
import { RepoInfo } from '../components/GitHub/RepoInfo';

import '../styles/GitHubPage.css';

export const GitHubPage = ({backTo}) => {
    const api_url = 'https://api.github.com/users';

    const [newName, setNewName] = useState("");
    const [loginInfo, setLoginInfo] = useState({});
    const [repoInfo, setRepoInfo] = useState([]);

    const findUser = () => {
        Axios.get(`${api_url}/${newName}`)
            .then((res) => {
                setLoginInfo(res.data);
            }
        );

        Axios.get(`${api_url}/${newName}/repos`)
            .then((res) => {
                setRepoInfo(res.data);
            })
    }; 


    return (
        <>
        <div id='gitMockBody'>
            <button className='button'>
                        <Link to={backTo}>Back to Home</Link>
            </button>
            <div className='searchBar'>
                <input 
                    placeholder='Username' 
                    id='username' 
                    type='text' 
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}/>

                <button onClick={findUser}> Search </button>
            </div>
            
            {loginInfo.login && (
                <div id='mainContainer'>
                    <UserInfo
                        name={loginInfo?.name}
                        userEmail={loginInfo?.email}
                        userName={loginInfo?.login}
                        location={loginInfo?.location}
                        numOfGists={loginInfo?.public_gists}
                        avatar={loginInfo?.avatar_url}
                    />

                    <RepoInfo
                        repoInfo={repoInfo}
                    />
                </div>
            )}
        </div>
        </>
    );
};