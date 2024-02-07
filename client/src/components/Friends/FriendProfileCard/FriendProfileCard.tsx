import './FriendProfileCard.css';
import { Friend } from '../../../types/data'
import { Link } from 'react-router-dom';
import PathConstants from '../../../routes/PathConstants';
type FriendProfileCardProps = {
    request?: boolean;
    user: Friend;
    toggleFriendship: (id: string) => void;
    denyRequest?: (id: string) => void;
    isProfileOwner: boolean;
}

export default function FriendProfileCard ({request, user, isProfileOwner, toggleFriendship,denyRequest}: FriendProfileCardProps) {
    return (
        <article className="friend-profile-card">
            <Link to={`/${PathConstants.Profile}/${user._id}`}>
                <img className="friend-profile-card-img" src={user.profilePicture} alt="profile image" />
            </Link>
            <div className="friend-profile-card-info">
                <Link to={`/${PathConstants.Profile}/${user._id}`}>
                    <p className='friend-profile-card-username'>{user.username}</p>
                </Link>
                {isProfileOwner &&
                    <>
                        <button onClick={toggleFriendship.bind(null, user._id)} 
                                className='friend-profile-card-btn'>{request ? 'Accept Request' : 'Remove Friend'}
                        </button>
                        {
                            request && 
                            <button onClick={denyRequest && denyRequest.bind(null, user._id)} 
                                className='friend-profile-card-btn'>Reject Request
                            </button>
                        }
                    </>
                }
            </div>
        </article>
    )
}