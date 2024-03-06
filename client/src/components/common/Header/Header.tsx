import PathConstants from '../../../routes/PathConstants';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { NavLink } from 'react-router-dom';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { logoutUser } = useAuthContext();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const ref = useClickOutside(() => setIsMenuOpen(false));

    function handleLogout() {
        if (user) {
            try {
                logoutUser();
                navigate('/login');
            } catch (error) {
                console.log('This is an error', error);
            }
        }
    }

    return (
        <header ref={ref} className={styles["header"]}>
            <Link to={PathConstants.Home}>
                <img className={styles["logo"]} src="/images/logo.png" alt="" />
            </Link>
            <nav className={styles["nav-wrapper"]}>
                <button className={styles["burger-menu"]} onClick={toggleMenu}> ☰ </button>
                <ul className={isMenuOpen ? styles["nav-active"] : ''}>
                    {user ? (
                        <>
                            <li className={styles["nav-item"]}>
                                <NavLink end className={styles["nav-link"]} to={PathConstants.Home}>
                                    <span className={styles["icon"]}><FontAwesomeIcon icon={faHouse} /></span>
                                    <span className={styles["nav-link-text"]}>Home</span>
                                </NavLink>
                            </li>
                            <li className={styles["nav-item"]}>
                                <NavLink className={styles["nav-link"]} to={`${PathConstants.Profile}/${user._id}`}>
                                    <span className={styles["icon"]}><FontAwesomeIcon icon={faUser} /></span>
                                    <span className={styles[""]}>Profile</span>
                                </NavLink>
                            </li>
                            <li className={styles["nav-item"]}>
                                <button className={styles["logout-btn"]} onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={styles["nav-item"]}>
                                <NavLink end className={styles["nav-link"]} to={PathConstants.Login}>Login</NavLink>
                            </li>
                            <li className={styles["nav-item"]}>
                                <NavLink end className={styles["nav-link"]} to={PathConstants.Register}>Register</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
