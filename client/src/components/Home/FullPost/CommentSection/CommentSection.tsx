import Comment from "./Comment/Comment";
import CommentField from "./CommentField/CommentField";
import "./CommentSection.css";
import Loader from "../../../UI/Loader/Loader";
import { useComments } from "../../../../hooks/useComments";
import Toast from "../../../UI/Toast/Toast";

interface CommentSectionProps {
  postId: string;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentSection({postId, setCommentCount}: CommentSectionProps) {
  
  const { comments, loading, error, updateComment, deleteComment, createComment, likeComment } = useComments(postId, setCommentCount); 

  return (
    <section className="comment-section">
        <hr className="divider" />
        <CommentField createComment={createComment} />
        <div className="comment-area">
            {!loading && error && <Toast message={error} type="error"/>}
            {loading ? 
                <Loader />
                  :
                comments.map(comment => (
                    <Comment key={comment._id} comment={comment} postId={postId} updateComment={updateComment} deleteComment={deleteComment} likeComment={likeComment}/>
                ))
              }
        </div>
    </section>
  );
}