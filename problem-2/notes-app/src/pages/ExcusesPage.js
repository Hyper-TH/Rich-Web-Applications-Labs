import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/ExcusesPage.css';

export const ExcusesPage = ({ backTo }) => {
    const [excuseDetails, setExcuseDetails] = useState("");

    const fetchData = (category) => {
        Axios.get(`https://excuser-three.vercel.app/v1/excuse/${category}`)
            .then((res) => {
                setExcuseDetails(res.data[0].excuse);   // Returns an array, hence the [0]
            });
    };

    return (
        <>
        <h1> Welcome to the Excuse Generator! </h1>
        
        <button className='button'>
            <Link to={backTo}>Back to Home</Link>
        </button>


        <h2 className='excuse'>{excuseDetails || "Choose a category"}</h2>
        
        <div className='buttonList'>
            <button 
                onClick={() => fetchData("party")} 
                className='button'> 
                Party 
            </button>

            <button 
                onClick={() => fetchData("family")} 
                className='button'> 
                Family 
            </button>
            <button 
                onClick={() => fetchData("office")} 
                className='button'> 
                Office 
            </button>
        </div>
        </>
    );
};