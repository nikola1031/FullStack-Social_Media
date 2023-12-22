import "./Post.css";

interface PostProps {
    showOverlayOnCLick: () => void;
}


export default function Post({ showOverlayOnCLick, post, author }: any) {

    return (
        <article className="post-container" onClick={showOverlayOnCLick}>
            <div className="post-wrapper">
                <img
                    className="post-image"
                    src="https://picsum.photos/200/300"
                    alt="random"
                />
                <p className="post-content">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Doloribus excepturi ex ab voluptatibus, quam veritatis eos
                    eum.
                </p>
            </div>
                <p className="post-owner">Post by <img className="user-avatar" src="https://picsum.photos/50/50" alt="avatar" /><span className="post-owner-username">KonImperator</span></p>
                <button className="post-btn unlike-post">Remove from Liked</button>
        </article>
    );
}
