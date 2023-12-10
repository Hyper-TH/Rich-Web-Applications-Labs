import '../../styles/GitHubPage.css';
import React from 'react';

export const RepoInfo = (props) => {
    return (
        <>
            <div id='userRepos'>
                <h1> User Repos </h1>
                <div id="repoTableWrapper">
                    <table id='repoInfo'>
                        <tbody id="Rlist">
                            {props.repoInfo.map(function (repo, i) {
                                return (
                                    <React.Fragment key={i}>
                                        <tr>
                                            <th>Name:</th>
                                            <td>{repo.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Description:</th>
                                            <td>{repo.description || 'N/A'}</td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
