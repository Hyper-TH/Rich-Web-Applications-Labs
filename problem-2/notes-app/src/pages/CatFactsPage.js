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
        <h1>Welcome to the {subPageName}</h1>

        <button className='button'>
            <Link to={backTo}>Back to Home</Link>
        </button>

        <div className="App"> 
            <button onClick={fetchCatFact} className='button'>
                Generate Cat Fact
            </button>
            <h2 className='catFact'> {catFact} </h2>
		</div>

        </>
    );
};
