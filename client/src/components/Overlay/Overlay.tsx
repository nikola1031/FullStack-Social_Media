import { PropsWithChildren, useState } from 'react';
import './Overlay.css';

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function Overlay ({ isOpen, onClose, children }: PropsWithChildren & OverlayProps) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Prevent closing overlay when clicking inside the modal content
    e.stopPropagation();
  };

  return isOpen ?
    (
      <div className="overlay">
        <div className="backdrop" onClick={onClose}>
          <div className='overlay-container'>
            <button className='close-button' onClick={onClose}>X</button>
            <div className='overlay-content'>
              {children}
            </div>
          </div>
          
        {/*  <textarea
            placeholder="Add your comment..."
            value={comment}
            onChange={handleCommentChange}
          /> */}
      {/*    <button onClick={() => console.log('Add comment:', comment)}>
            Add Comment
          </button> */}
        </div>
      </div>
    ) : null;
};