import Post from './Post/Post';
import './Home.css';

export default function Home() {
    return (
        <>
            <section className="send-post">
                <form className="send-post-form">
                    <input type="text" placeholder="What's on your mind?" />
                    <button>Post</button>
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
