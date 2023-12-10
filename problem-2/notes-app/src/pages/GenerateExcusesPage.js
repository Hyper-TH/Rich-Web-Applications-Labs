import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/ExcusesPage.css';

export const GenerateExcusesPage = ({ backTo }) => {
    const [excuseDetails, setExcuseDetails] = useState("");
    const [error, setError] = useState("");

    const generateExcuse = async (category) => {
        try {
            const response = await Axios.get(`http://localhost:8000/excuse?category=${encodeURIComponent(category)}`);
    
            console.log(response);

            if (response && response.data[0].excuse) {
                setExcuseDetails(response.data[0].excuse);
                setError("");

                await Axios.post('http://localhost:8000/putExcuse', {
                    excuse: response.data[0].excuse,
                    category: response.data[0].category
                });

            } else {
                setExcuseDetails("");
                setError("Error retrieving excuse");
            }

        } catch (error) {
            console.error(`Error: ${error}`);
            setExcuseDetails("");
            setError("Internal Server Error");
        }
    };

    return (
        <>
        <div id='excusesMockBody'>
            <div className='excuse'>
                <h1> Welcome to the Excuse Generator! </h1>

                <h2 className='excuse'>{excuseDetails || "Choose a category"}</h2>
                
                <div className='buttonList'>
                    <button className='button'>
                        <Link to={backTo}>Back to Home</Link>
                    </button>

                    <button 
                        onClick={() => generateExcuse("party")} 
                        className='button'> 
                        Party 
                    </button>

                    <button 
                        onClick={() => generateExcuse("family")} 
                        className='button'> 
                        Family 
                    </button>
                    <button 
                        onClick={() => generateExcuse("office")} 
                        className='button'> 
                        Office 
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};