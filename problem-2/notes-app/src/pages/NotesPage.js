import { Link, useNavigate } from 'react-router-dom';
import { Axios } from 'axios';
import { useState, useEffect } from 'react';

export const NotesPage = ({subPageName, backTo}) => {
    return (
        <>
        <h1>Welcome to the {subPageName}</h1>

        <button>
            <Link to={backTo}>Back to Home</Link>
        </button>
        </>
    );
};