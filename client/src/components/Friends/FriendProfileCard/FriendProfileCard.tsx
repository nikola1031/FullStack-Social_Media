import './FriendProfileCard.css';
import { Friend } from '../../../types/data'
type FriendProfileCardProps = {
    request?: boolean;
    user: Friend;
    toggleFriendship: (id: string) => void;
}

export default function FriendProfileCard ({request, user, toggleFriendship}: FriendProfileCardProps) {
    return (
        <article className="friend-profile-card">
            <img className="friend-profile-card-img" src={user.profilePicture} alt="profile image" />
            <div className="friend-profile-card-info">
                <p className='friend-profile-card-username'>{user.username}</p>
                <button onClick={toggleFriendship.bind(null, user._id)} 
                    className='friend-profile-card-btn'>{request ? 'Accept Friend' : 'Remove Friend'}
                </button>
            </div>
        </article>
    )
}