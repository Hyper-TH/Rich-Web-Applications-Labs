import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/CatPage.css';

export const CatFactsPage = ({subPageName, backTo}) => {
    const [catFact, setCatFact] = useState("");

    const fetchCatFact = () => {
        Axios.get("https://catfact.ninja/fact").then((res) => {
            setCatFact(res.data.fact);
        });
    };
    // Run only when the component mounts
    useEffect(() => {
        fetchCatFact();
    }, []);

    return (
        <>
        <div id='catMockBody'>
            <h1 id='catHeader'>Welcome to the Cat Facts Page!</h1>

            <div className="App"> 

                <div className='catButtonList'>
                    <button className='catButton'>
                        <Link to={backTo}>Back to Home</Link>
                    </button>
                    <button onClick={fetchCatFact} className='catButton'>
                        Generate Cat Fact
                    </button>
                </div>

                <h2 className='catFact'> {catFact} </h2>
            </div>
        </div>
        </>
    );
};
