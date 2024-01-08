import Comment from "./Comment/Comment";
import CommentField from "./CommentField/CommentField";
import "./CommentSection.css";
import * as dataApi from '../../../../api/data';
import { useEffect, useState } from "react";
import { CommentData } from "../../../../types/data";

interface CommentSectionProps {
  postId: string;
  setCommentCount: (count: number) => void;
}

export default function CommentSection({postId, setCommentCount}: CommentSectionProps) {
  
  const [comments, setComments] = useState<CommentData[]>([]);

  function fetchComments() {
      dataApi.getComments(postId).then(comments => {
          setComments(comments);
          setCommentCount(comments.length);
      });
  }
  
  useEffect(() => {
    fetchComments();
  }, [])

  return (
    <section className="comment-section">
        <hr className="divider" />
            <CommentField postId={postId} fetchComments={fetchComments} />
        <div className="comment-area">
            {comments.map(comment => {
              return (
                <Comment key={comment._id} comment={comment} postId={postId} fetchComments={fetchComments}/>
              )
            })}
        </div>
        <div className="comment-form">
        </div>
    </section>
  );
}