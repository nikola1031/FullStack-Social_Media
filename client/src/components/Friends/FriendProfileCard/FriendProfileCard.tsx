import './FriendProfileCard.css';

type FriendProfileCardProps = {
    request?: boolean
}

export default function FriendProfileCard ({request}: FriendProfileCardProps) {
    return (
        <article className="friend-profile-card">
            <img className="friend-profile-card-img" src="https://picsum.photos/200/300" alt="profile image" />
            <div className="friend-profile-card-info">
                <p className='friend-profile-card-username'>KonImperator</p>
                <button className='friend-profile-card-btn'>{request ? 'Accept Friend' : 'Remove Friend'}</button>
            </div>
        </article>
    )
}