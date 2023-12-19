import './LikedPost.css';

export default function LikedPost() {
    return (
        <article className="liked-post-container">
            <div className='liked-post-wrapper'>
                <img
                    className="liked-post-image"
                    src="https://picsum.photos/200/300"
                    alt="random"
                />
                <p className="liked-post-content">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Doloribus excepturi ex ab voluptatibus, quam veritatis eos
                    eum.
                </p>
            </div>
                <p className='liked-post-owner'>Post by <img className='user-avatar' src="https://picsum.photos/50/50" alt="avatar" /><span className='liked-post-owner-username'>KonImperator</span></p>
                <button className='liked-post-btn unlike-post'>Remove from Liked</button>
                {/* Should be linkk to the post */}
                <button className='liked-post-btn go-to-post'>Go to Post</button>
        </article>
    );
}
