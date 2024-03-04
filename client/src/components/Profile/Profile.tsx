import { NavLink, Outlet, useParams } from 'react-router-dom';
import './Profile.css';
import { useEffect, useState } from 'react';
import PathConstants from '../../routes/PathConstants';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { UserData } from '../../types/data';
import { useTitle } from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import Avatar from '../UI/Avatar/Avatar';

import { FriendStatusEnum, FriendStatus } from '../../types/data';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useApiUsers } from '../../api/useApiUser';

export default function Profile() {
    const { user: loggedInUser } = useAuthContext();
    const [dropDownActive, setDropDownActive] = useState(false);
    const [user, setUser] = useState<UserData>();
    const [friendStatus, setFriendStatus] = useState<FriendStatus>(FriendStatusEnum.None);
    const userApi = useApiUsers();

    const ref = useClickOutside(() => setDropDownActive(false))

    const { id } = useParams();
    useTitle(`Profile - ${user?.username}`);
    
    const isProfileOwner = loggedInUser?._id === id;
    
    useEffect(() => {
        fetchUser()
        determineFriendStatus();
    }, [id]);

    function determineFriendStatus() {
        if (isProfileOwner) return;

        const alreadyFriends = user?.friends.some(friend => friend._id === loggedInUser?._id);
        if (alreadyFriends) return setFriendStatus(FriendStatusEnum.Friend);

        userApi.getFriendStatus(id!)
        .then((status) => setFriendStatus(status));
    }

    function fetchUser() {
        userApi.getProfileById(id!)
        .then(setUser)
    }

    function friendRequest(id: string) {
        userApi.toggleFriendRequest(id!).then((res) => setFriendStatus((prevStatus) => {
            setUser((prevUser) => ({...prevUser!, friendRequests: res.friendRequests, friends: res.friends}))
            if (prevStatus === FriendStatusEnum.Sent || prevStatus === FriendStatusEnum.Received){
                return FriendStatusEnum.None;
            }
            return FriendStatusEnum.Sent;
        }));
    }

    function toggleFriendship(id: string) {
        userApi.toggleFriend(id).then((res) => setFriendStatus((prevStatus) => {
            setUser((prevUser) => ({...prevUser!, friendRequests: res.friendRequests, friends: res.friends }))
            return prevStatus === FriendStatusEnum.Friend ? FriendStatusEnum.None : FriendStatusEnum.Friend;
        }))
    }

    const buttonText = () => {
        if (friendStatus === FriendStatusEnum.Friend) return "Remove Friend";
        if (friendStatus === FriendStatusEnum.Sent) return "Cancel Request";
        if (friendStatus === FriendStatusEnum.Received) return "Reject Request";
        return "Add Friend";
      };

    
    return (
        <div className="my-profile">
            <section className="my-profile-container">
                <div className='my-profile-header-wrapper'>
                    <header className="my-profile-header">
                        <Avatar image={user?.profilePicture} size='medium' />
                        <div className='my-profile-username-wrapper'>
                            <h2 className="my-profile-username">{user?.username}</h2>
                            <Link to={PathConstants.Friends}>
                                <p className="my-profile-friends-count">{user?.friends.length} Friends</p>
                            </Link>
                            {(!isProfileOwner && friendStatus !== FriendStatusEnum.Friend) && 
                                <button onClick={() => friendRequest(user!._id)} className='friend-button'>
                                    <i className="fa-solid fa-user-group"></i>
                                    {buttonText()}
                                </button>}
                        </div>
                    </header>
                    <p className="my-profile-bio">
                        {user?.bio}
                    </p>
                </div>
                <hr className='divider' />
                <nav ref={ref} className="my-profile-nav-container">
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
