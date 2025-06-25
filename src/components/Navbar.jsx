import { Link } from 'react-router-dom';

function Navbar() {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
            <div><Link to="/">🏠 Home</Link></div>
            <div>
                {isLoggedIn ? (
                    <>
                        <Link to="/dashboard" style={{ margin: '0 10px' }}>Dashboard</Link>
                        <Link to="/edit" style={{ margin: '0 10px' }}>Edit</Link>
                        <Link to="/upload" style={{ margin: '0 10px' }}>Upload Resume</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
