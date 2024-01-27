import { useOutletContext } from 'react-router-dom';
import FriendProfileCard from './FriendProfileCard/FriendProfileCard';
import './Friends.css';
import { ProfileContextType } from '../Profile/Profile';

export default function Friends() {

    const { user, isProfileOwner, toggleFriendship } = useOutletContext<ProfileContextType>();
    return (
        <> { isProfileOwner && 
                <section className="friend-requests-section">
                    <h2 className="friends-heading">Friend Requests</h2>
                    <div className="friends-container">
                        {user?.friendRequests.map((user) => {
                            return <FriendProfileCard key={user._id} toggleFriendship={toggleFriendship} user={user} request={true} />
                        })}
                    </div>
                </section>
            }
            <section className="friends-section">
                <h2 className="friends-heading">All Friends</h2>
                <div className="friends-container">
                {user?.friends.map((user) => {
                        return <FriendProfileCard key={user._id} toggleFriendship={toggleFriendship} user={user} />
                    })}
                </div>
            </section>
        </>
    );
}
