import { NavLink, Outlet } from 'react-router-dom';
import './Profile.css';
import { useState } from 'react';
import PathConstants from '../../routes/PathConstants';
// import PathConstants from '../../routes/PathConstants';

export default function Profile() {

    const [dropDownActive, setDropDownActive] = useState(false)

    return (
        <div className="my-profile">
            <section className="my-profile-container">
                <div className='my-profile-header-wrapper'>
                    <header className="my-profile-header">
                        <img
                            className="my-profile-avatar"
                            src="https://picsum.photos/200/300"
                            alt="profile picture"
                        />
                        <div className='my-profile-username-wrapper'>
                            <h2 className="my-profile-username">KonImperator</h2>
                            <p className="my-profile-friends-count">190 Friends</p>
                        </div>
                    </header>
                    <p className="my-profile-bio">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quo rem temporibus ipsa, nam neque aliquam corrupti
                        nulla facilis illo deserunt sapiente voluptatem unde sed
                        assumenda nobis optio omnis. Dolorem, accusantium!
                    </p>
                </div>
                <hr className='divider' />
                <nav className="my-profile-nav-container">
                    <button className='my-profile-nav-button' onClick={() => setDropDownActive(!dropDownActive)} type='button'>Menu<i className="fa-solid fa-caret-down"></i></button>
                    <ul className={`my-profile-nav${dropDownActive ? ' my-profile-nav-active' : ''}`}>
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={''} end ><div className='nav-text-wrapper'>My Posts</div></NavLink>
                        </li>
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={PathConstants.LikedPosts} end ><div className='nav-text-wrapper'>Liked Posts</div></NavLink>
                        </li>
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={PathConstants.Photos} end ><div className='nav-text-wrapper'>Photos</div></NavLink>
                        </li>
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={PathConstants.Friends} end ><div className='nav-text-wrapper'>Friends</div></NavLink>
                        </li>
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={''} end ><div className='nav-text-wrapper'>Edit Profile</div></NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
            <hr className='divider' />
            <Outlet />
        </div>
    );
}
