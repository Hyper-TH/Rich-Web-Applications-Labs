import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export const HomePage = () => {
    return (
        <>
        <div id='homeMockBody'> 
            <div className='home'>
            <h2>Home Page</h2>
                <div className='buttonList'>
                    <button className='button'>
                        <Link to="/notes">Notes Site</Link>
                    </button>
                    <button className='button'>
                        <Link to="/catfacts">Get a Cat Fact</Link>
                    </button>
                    <button className='button'>
                        <Link to="/generateExcuse"> Generate an Excuse </Link>
                    </button>
                    <button className='button'>
                        <Link to="/excuses"> Get List of Excuses </Link>
                    </button>
                    <button className='button'>
                        <Link to="/github"> GitHub API </Link>
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};