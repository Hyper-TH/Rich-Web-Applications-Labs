import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/GenerateExcusesPage.css';

export const ExcusesPage = ({backTo}) => {
    const [excuses, setExcuses] = useState([]);
    const [error, setError] = useState("");
    
    const fetchExcuses = async (category) => {
        try {
            // Fetch excuses from the server
            const response = await Axios.get(`http://localhost:8000/getExcuses?category=${encodeURIComponent(category)}`);

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

    return (
        <>
        <div id='excuses2MockBody'> 
            <div className='excuse'>
                <h1> Get your list of excuses here! </h1>
                <h3> Use Responsibly! </h3>

                <div className='buttonList'>
                    <button className='button'>
                        <Link to={backTo}>Back to Home</Link>
                    </button>
                    
                    <button 
                        onClick={() => fetchExcuses("party")} 
                        className='button'> 
                        Party 
                    </button>

                    <button 
                        onClick={() => fetchExcuses("family")} 
                        className='button'> 
                        Family 
                    </button>
                    <button 
                        onClick={() => fetchExcuses("office")} 
                        className='button'> 
                        Office 
                    </button>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {excuses?.map((excuse, index) => (
                    <div key={index}>
                        <p>{index + 1}. {excuse.excuse}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
};
