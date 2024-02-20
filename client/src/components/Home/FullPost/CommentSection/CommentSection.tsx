import Comment from "./Comment/Comment";
import CommentField from "./CommentField/CommentField";
import "./CommentSection.css";
import Loader from "../../../UI/Loader/Loader";
import { useComments } from "../../../../hooks/useComments";
import ErrorMessage from "../../../UI/ErrorMessage/ErrorMessage";

interface CommentSectionProps {
  postId: string;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentSection({postId, setCommentCount}: CommentSectionProps) {
  
  const { comments, isLoading, error, updateComment, deleteComment, createComment } = useComments(postId, setCommentCount); 

  return (
    <section className="comment-section">
        <hr className="divider" />
            <CommentField createComment={createComment} />
        <div className="comment-area">
            {!isLoading && error && <ErrorMessage error={error} />}
            {!isLoading && !error ? 
                comments.map(comment => (
                    <Comment key={comment._id} comment={comment} postId={postId} updateComment={updateComment} deleteComment={deleteComment}/>
                )) :
                  <Loader />
              }
        </div>
    </section>
  );
}