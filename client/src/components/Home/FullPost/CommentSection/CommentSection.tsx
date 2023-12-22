import Comment from "./Comment/Comment";
import CommentField from "./CommentField/CommentField";
import "./CommentSection.css";

export default function CommentSection() {
  // TODO: Get comments from API
  // TODO: Render comments by passing in each comment as a prop
  
  return (
    <section className="comment-section">
        <hr className="divider" />
        <div className="comment-area">
            <Comment />
            <Comment />
            <Comment />
        </div>
        <div className="comment-form">
            <CommentField />
        </div>
    </section>
  );
}