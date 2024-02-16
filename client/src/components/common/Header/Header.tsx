import PathConstants from '../../../routes/PathConstants';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as authApi from '../../../api/auth';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logoutUser } = useAuthContext();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function handleLogout() {
        if (user) {
            try {
                // authApi.logout(user.accessToken);
                logoutUser();
                navigate('/login');
            } catch (error) {
                console.log('This is an error', error);
            }
        }
    }

    return (
        <header className="header">
            <Link to={PathConstants.Home}>
                <img className="logo" src="/images/logo.png" alt="" />
            </Link>
            <nav className="nav-wrapper">
                <button className="burger-menu" onClick={toggleMenu}> ☰ </button>
                <ul className={isMenuOpen ? 'nav-active' : ''}>
                    {user ? (
                        <>
                            <li className='nav-item'>
                                <NavLink end className='nav-link' to={PathConstants.Home}>Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to={`${PathConstants.Profile}/${user._id}`}>Profile</NavLink>
                            </li>
                            <li className='nav-item'>
                                <button className='logout-btn' onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='nav-item'>
                                <NavLink end className='nav-link' to={PathConstants.Login}>Login</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink end className='nav-link' to={PathConstants.Register}>Register</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
