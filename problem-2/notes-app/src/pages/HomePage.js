import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <>
        <div>
            <h2>Home Page</h2>
            <p>Choose an option:</p>

            <div>
                <button>
                    <Link to="/notes">Notes Site</Link>
                </button>
                <button>
                    <Link to="/catfacts">Get a Cat Fact</Link>
                </button>
                <button>
                    <Link to="/generateExcuse"> Generate an Excuse </Link>
                </button>
            </div>
        </div>
        </>
    );
};