import styles from './Profile.module.css';
import { NavLink, Outlet, useParams } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons/faUserGroup';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

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
            fetchUser().then(() => determineFriendStatus());
    }, [id]);

    function determineFriendStatus() {
        if (isProfileOwner) return;

        const alreadyFriends = user?.friends.some(friend => friend._id === loggedInUser?._id);
        if (alreadyFriends) return setFriendStatus(FriendStatusEnum.Friend);

        userApi.getFriendStatus(id!)
        .then((status) => setFriendStatus(status));
    }

    async function fetchUser() {
        const user = await userApi.getProfileById(id!);
        setUser(user);
    }

    function friendRequest(id: string) {
        userApi.toggleFriendRequest(id!).then(() => setFriendStatus((prevStatus) => {
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
        <div className={styles["my-profile"]}>
            <section className={styles["my-profile-container"]}>
                <div className={styles["my-profile-header-wrapper"]}>
                    <header className={styles["my-profile-header"]}>
                        <Avatar image={user?.profilePicture} size='medium' />
                        <div className={styles["my-profile-username-wrapper"]}>
                            <h2 className={styles["my-profile-username"]}>{user?.username}</h2>
                            <Link to={PathConstants.Friends}>
                                <p className={styles["my-profile-friends-count"]}>{user?.friends.length} Friends</p>
                            </Link>
                            {(!isProfileOwner && friendStatus !== FriendStatusEnum.Friend) && 
                                <button onClick={() => friendRequest(user!._id)} className={styles["friend-button"]}>
                                    <FontAwesomeIcon icon={faUserGroup} />
                                    {buttonText()}
                                </button>}
                        </div>
                    </header>
                    <p className={styles["my-profile-bio"]}>
                        {user?.bio}
                    </p>
                </div>
                <hr className="divider" />
                <nav ref={ref} className={styles["my-profile-nav-container"]}>
                    <button className={styles["my-profile-nav-button"]} onClick={() => setDropDownActive(!dropDownActive)}>
                    <span className={styles["button-content"]}>Menu</span>
                    <span className={styles["icon"]}>
                        { dropDownActive 
                                ? <FontAwesomeIcon icon={faAngleUp} /> 
                                : <FontAwesomeIcon icon={faAngleDown} />
                        }
                    </span>
                    </button>
                    <ul className={`${styles["my-profile-nav"]} ${dropDownActive ? styles["my-profile-nav-active"] : ''}`}>
                        <li className={styles["my-profile-nav-item"]}>
                            <NavLink className={styles["my-profile-nav-link"]} to={PathConstants.Posts} end ><div className={styles["nav-text-wrapper"]}>Posts</div></NavLink>
                        </li> 
                        <li className={styles["my-profile-nav-item"]}>
                            <NavLink className={styles["my-profile-nav-link"]} to={PathConstants.Photos} end ><div className={styles["nav-text-wrapper"]}>Photos</div></NavLink>
                        </li>
                        <li className={styles["my-profile-nav-item"]}>
                            <NavLink className={styles["my-profile-nav-link"]} to={PathConstants.Friends} end ><div className={styles["nav-text-wrapper"]}>Friends</div></NavLink>
                        </li>
                        {isProfileOwner &&
                        <>
                        <li className={styles["my-profile-nav-item"]}>
                            <NavLink className={styles["my-profile-nav-link"]} to={PathConstants.Edit} end ><div className={styles["nav-text-wrapper"]}>Edit Profile</div></NavLink>
                        </li>
                        <li className={styles["my-profile-nav-item"]}>
                            <NavLink className={styles["my-profile-nav-link"]} to={PathConstants.ChangePassword} end ><div className={styles["nav-text-wrapper"]}>Change Password</div></NavLink>
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
