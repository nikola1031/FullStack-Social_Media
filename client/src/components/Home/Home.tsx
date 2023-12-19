import Post from './Post/Post';
import './Home.css';

export default function Home() {
    // TODO: Add posts from database here
    return (
        <>
            <section className="send-post">
                <form className="send-post-form">
                    <div className="send-post-input-container">
                        <img className="send-post-img user-avatar" src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="avatar" />
                        <textarea className="send-post-input" placeholder="What's on your mind?" />
                        {/* Need to add image uploads around here somewhere later */}
                    </div>
                    <button className="send-post-btn">Post</button>
                </form>
            </section>
            <section className="posts-container">
                <Post />
                <Post />
                <Post />
            </section>
        </>
    );
}
