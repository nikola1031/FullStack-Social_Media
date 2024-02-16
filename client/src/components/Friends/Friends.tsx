import { useOutletContext } from 'react-router-dom';
import FriendProfileCard from './FriendProfileCard/FriendProfileCard';
import './Friends.css';
import { ProfileContextType } from '../../types/data';
import { useTitle } from '../../hooks/useTitle';

export default function Friends() {
    useTitle('Friends');
    const { user, isProfileOwner, toggleFriendship, friendRequest } = useOutletContext<ProfileContextType>();
    return (
        <div className="friends-wrapper">
            { (isProfileOwner && user.friendRequests.received.length > 0) &&
                <section className="friend-requests-section">
                    <h2 className="friends-heading">Friend Requests</h2>
                    <div className="friends-container">
                        {user?.friendRequests.received.map((currentUser) => {
                            return <FriendProfileCard key={currentUser._id} isProfileOwner={isProfileOwner} toggleFriendship={toggleFriendship} denyRequest={friendRequest} user={currentUser} request={true} />
                        })}
                    </div>
                </section>
            }
            {user.friends.length > 0 ?
                <section className="friends-section">
                    <h2 className="friends-heading">All Friends</h2>
                    <div className="friends-container">
                    {user?.friends.map((currentUser) => {
                            return <FriendProfileCard key={currentUser._id} isProfileOwner={isProfileOwner} toggleFriendship={toggleFriendship} user={currentUser} />
                        })}
                    </div>
                </section>
                :
                <div className="no-friends-container">
                    <h2 className="friends-heading">No Friends Yet</h2>
                </div>
            }
        </div>
    );
}
