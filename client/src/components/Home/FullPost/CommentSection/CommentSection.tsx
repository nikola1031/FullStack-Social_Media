import Comment from "./Comment/Comment";
import CommentField from "./CommentField/CommentField";
import "./CommentSection.css";
import * as dataApi from '../../../../api/data';
import { useEffect, useState } from "react";
import { CommentData } from "../../../../types/data";

interface CommentSectionProps {
  postId: string  
}


export default function CommentSection({postId}: CommentSectionProps) {
  
  const [comments, setComments] = useState<CommentData[]>([]);
  
  useEffect(() => {
    dataApi.getComments(postId).then(setComments);
  }, [])

  return (
    <section className="comment-section">
        <hr className="divider" />
            <CommentField postId={postId} />
        <div className="comment-area">
            {comments.map(comment => {
              return (
                <Comment key={comment._id} comment={comment} postId={postId} />
              )
            })}
        </div>
        <div className="comment-form">
        </div>
    </section>
  );
}