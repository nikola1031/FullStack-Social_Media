import FriendProfileCard from './FriendProfileCard/FriendProfileCard';
import './Friends.css';

export default function Friends() {
    return (
        <>
            <section className="friend-requests-section">
                <h2 className="friends-heading">Friend Requests</h2>
                <div className="friends-container">
                    <FriendProfileCard request={true} />
                    <FriendProfileCard request={true} />
                    <FriendProfileCard request={true} />
                    <FriendProfileCard request={true} />
                    <FriendProfileCard request={true} />
                </div>
            </section>
            <section className="friends-section">
                <h2 className="friends-heading">All Friends</h2>
                <div className="friends-container">
                    <FriendProfileCard />
                    <FriendProfileCard />
                    <FriendProfileCard />
                    <FriendProfileCard />
                    <FriendProfileCard />
                </div>
            </section>
        </>
    );
}
