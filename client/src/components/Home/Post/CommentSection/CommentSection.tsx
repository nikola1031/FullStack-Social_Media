import Comment from "./Comment/Comment";
import CommentField from "./CommentField/CommentField";
import "./CommentSection.css";

export default function CommentSection() {
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