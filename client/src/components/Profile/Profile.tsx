import { NavLink, Outlet, useParams } from 'react-router-dom';
import './Profile.css';
import { useEffect, useState } from 'react';
import PathConstants from '../../routes/PathConstants';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as dataApi from '../../api/data';
import { UserData } from '../../types/data';

enum FriendStatus {
    Friend = 'friend',
    Pending = 'pending',
    None = 'none',
}

export default function Profile() {

    const [dropDownActive, setDropDownActive] = useState(false);
    const { id } = useParams();
    const { user: loggedInUser } = useAuthContext();
    const isProfileOwner = loggedInUser?._id === id;
    const [user, setUser] = useState<UserData>();
    const [friendStatus, setFriendStatus] = useState('');
    
    useEffect(() => {
        fetchUser();
    }, [id]);


    function fetchUser() {
        dataApi.getProfileById(id!).then((data) => {
            setUser(data.user)
            determineFriendStatus(data.user);
        });
    }

    function friendRequest() {
        dataApi.toggleFriendRequest(id!).then(() => setFriendStatus((prevStatus) => {
            return prevStatus === FriendStatus.Pending ? FriendStatus.None : FriendStatus.Pending;
        }));
    }

    function toggleFriendship(id: string) {
        dataApi.toggleFriend(id).then(() => setFriendStatus((prevStatus) => {
            fetchUser();
            return prevStatus === FriendStatus.Friend ? FriendStatus.None : FriendStatus.Friend;
        }))
    }
    
    function determineFriendStatus(user: UserData) {
        if (user?.friends.some(friend => friend._id === user?._id)) {
            return setFriendStatus(FriendStatus.Friend);
        }
       
        if (user?.friendRequests.some(request => request._id === loggedInUser?._id)) {
            return setFriendStatus(FriendStatus.Pending);
        }
        setFriendStatus(FriendStatus.None);
    }

    const buttonText = () => {
        if (friendStatus === FriendStatus.Friend) {
          return "Remove Friend";
        }
        if (friendStatus === FriendStatus.Pending) {
          return "Cancel Request";
        }          
        return "Add Friend";
      };

    
    return (
        <div className="my-profile">
            <section className="my-profile-container">
                <div className='my-profile-header-wrapper'>
                    <header className="my-profile-header">
                        <img
                            className="my-profile-avatar"
                            src={user?.profilePicture}
                            alt="profile picture"
                        />
                        <div className='my-profile-username-wrapper'>
                            {!isProfileOwner && <button onClick={friendRequest} className='friend-button'>
                                <i className="fa-solid fa-user-group"></i>
                                {buttonText()}
                            </button>}
                            <h2 className="my-profile-username">{user?.username}</h2>
                            <p className="my-profile-friends-count">{user?.friends.length} Friends</p>
                        </div>
                    </header>
                    <p className="my-profile-bio">
                        {user?.bio}
                    </p>
                </div>
                <hr className='divider' />
                <nav className="my-profile-nav-container">
                    <button className='my-profile-nav-button' onClick={() => setDropDownActive(!dropDownActive)}>Menu<i className="fa-solid fa-caret-down"></i></button>
                    <ul className={`my-profile-nav${dropDownActive ? ' my-profile-nav-active' : ''}`}>
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={PathConstants.Posts} end ><div className='nav-text-wrapper'>Posts</div></NavLink>
                        </li> 
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={PathConstants.Photos} end ><div className='nav-text-wrapper'>Photos</div></NavLink>
                        </li>
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={PathConstants.Friends} end ><div className='nav-text-wrapper'>Friends</div></NavLink>
                        </li>
                        {isProfileOwner &&
                        <>
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={PathConstants.Edit} end ><div className='nav-text-wrapper'>Edit Profile</div></NavLink>
                        </li>
                        <li className="my-profile-nav-item">
                            <NavLink className='my-profile-nav-link' to={PathConstants.ChangePassword} end ><div className='nav-text-wrapper'>Change Password</div></NavLink>
                        </li>
                        </>
                        }
                    </ul>
                </nav>
            </section>
            <hr className="divider" />
            <Outlet context={{setUser, toggleFriendship, isProfileOwner, user}}/>
        </div>
    );
}
