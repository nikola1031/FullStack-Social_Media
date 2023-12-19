import "./Comment.css";

export default function Comment() {

    // TODO: Get comment data as a prop
    // TODO: Like a comment
    // TODO: Delete a comment if author 
    // TODO: Edit a comment if author 

    return (
        <div className="comment">
            <img className="user-avatar" src="https://picsum.photos/50/50" alt="avatar" />
            <div className="comment-info-container">
                <div className="comment-info">
                    <p className="comment-username">KonImperator</p>
                    <p className="comment-content">
                        This is a comment, no really, it is a real comment and it goes on and on and on and on and on and on and on
                    </p>
                </div>
                <div className="comment-actions">
                    <time className="comment-time">2d</time>
                    <button className="comment-action comment-like">Like</button>
                    <button className="comment-action comment-delete">Delete</button>
                    <button className="comment-action comment-edit">Edit</button>
                </div>
            </div>
        </div>
    );
}
