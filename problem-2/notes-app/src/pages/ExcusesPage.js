import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/ExcusesPage2.css';

export const ExcusesPage = ({backTo}) => {
    const [excuses, setExcuses] = useState([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchExcuses = async () => {
            try {
                // Fetch excuses from the server
                const response = await Axios.get('http://localhost:8000/getExcuses');

                if (response.data && response.data.documents) {
                    setExcuses(response.data.documents);
                    setError("");
                } else {
                    setError("Error retrieving excuses");
                }
            } catch (error) {
                console.error(`Error: ${error}`);
                setError("Internal Server Error");
            }
        };

        // Call function to fetch once component mounts
        fetchExcuses();
    }, []);

    return (
        <>
        <div className='excuse'>
            <h1> Get your list of excuses here! </h1>
            <h3> Use Responsibly! </h3>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {excuses.map((excuse, index) => (
                <div key={index}>
                    <p>Category: {excuse.category}</p>
                    <p>Excuse: {excuse.excuse}</p>
                </div>
            ))}
        </div>

        
        <button className='button'>
            <Link to={backTo}>Back to Home</Link>
        </button>

        </>
    )
};
