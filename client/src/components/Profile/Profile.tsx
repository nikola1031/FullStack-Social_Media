import { NavLink, Outlet, useParams } from 'react-router-dom';
import './Profile.css';
import { useEffect, useState } from 'react';
import PathConstants from '../../routes/PathConstants';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as dataApi from '../../api/data';
import { UserData } from '../../types/data';
import { useTitle } from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import Avatar from '../UI/Avatar/Avatar';

enum FriendStatus {
    Friend = 'friend',
    Pending = 'pending',
    None = 'none',
}

export default function Profile() {
    const [dropDownActive, setDropDownActive] = useState(false);
    const { id } = useParams();
    const { user: loggedInUser } = useAuthContext();
    const [user, setUser] = useState<UserData>();
    const [friendStatus, setFriendStatus] = useState('');
    
    useTitle(`Profile - ${user?.username}`);

    const isProfileOwner = loggedInUser?._id === id;
    const areAlreadyFiends = user?.friends.some(friend => friend._id === loggedInUser?._id);
    
    useEffect(() => {
        fetchUser();
    }, [id]);


    function fetchUser() {
        dataApi.getProfileById(id!).then((data) => {
            setUser(data.user)
            determineFriendStatus(data.user);
        });
    }

    function friendRequest(id: string) {
        dataApi.toggleFriendRequest(id!).then((res) => setFriendStatus((prevStatus) => {
            setUser((prevUser) => ({...prevUser!, friendRequests: res.friendRequests, friends: res.friends}))
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
                        <Avatar image={user?.profilePicture} large />
                        <div className='my-profile-username-wrapper'>
                            {(!isProfileOwner && !areAlreadyFiends) && <button onClick={() => friendRequest(user!._id)} className='friend-button'>
                                <i className="fa-solid fa-user-group"></i>
                                {buttonText()}
                            </button>}
                            <h2 className="my-profile-username">{user?.username}</h2>
                            <Link to={PathConstants.Friends}>
                                <p className="my-profile-friends-count">{user?.friends.length} Friends</p>
                            </Link>
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
            <hr className="divider" />
            </section>
            <Outlet context={{setUser, toggleFriendship, friendRequest, isProfileOwner, user}}/>
        </div>
    );
}
