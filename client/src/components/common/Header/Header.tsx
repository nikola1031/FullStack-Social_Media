import PathConstants from '../../../routes/PathConstants';
import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
        <img className="logo" src="/images/logo.png" alt="" />
        <nav className="nav-wrapper">
            <button className="burger-menu" onClick={toggleMenu}>☰</button>
            <ul className={isMenuOpen ? 'nav-active' : ''}>
                <li><Link to={PathConstants.Home}>Home</Link></li>
                <li><Link to={PathConstants.Friends}>Friends</Link></li>
                <li><Link to={PathConstants.Profile}>Profile</Link></li>
                <li><Link to={PathConstants.LikedPosts}>Liked Posts</Link></li>
                <li><Link to={PathConstants.Login}>Login</Link></li>
                <li><Link to={PathConstants.Register}>Register</Link></li>
            </ul>
        </nav>
    </header>
);
}