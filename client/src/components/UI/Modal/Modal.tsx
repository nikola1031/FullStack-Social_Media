import { useEffect } from 'react';
import './Modal.css';

interface ModalProps {
    show: boolean;
    action: () => void;
    onClose: () => void;
}


export default function Modal({show, action, onClose}: ModalProps) {

    useEffect(() => {
        // Disable scrolling on the body when the overlay is active
        document.body.style.overflow = 'hidden';
        // Re-enable scrolling when the overlay is closed
        return () => {
          document.body.style.overflow = '';
        };
      }, []);

      function handleOnAction() {
        action();
        onClose();
      }

      const handleModalClick = (e: React.MouseEvent) => {
        // Prevent closing overlay when clicking inside the modal content
        e.stopPropagation();
      };

    return (
        show &&
        (
            <div className='modal-overlay' onClick={onClose}>
                <div role='dialog' autoFocus className='modal-container' onClick={handleModalClick}>
                    <header className='modal-header'>
                        <h1>Delete Action</h1>
                    </header>
                    <div className='modal-body'>
                        <h3>Are you sure you want to do this?</h3>
                    </div>
                    <div className='modal-buttons'>
                        <button onClick={handleOnAction} className='delete-btn'>Delete</button>
                        <button onClick={onClose} className='cancel-btn'>Cancel</button>
                    </div>
                </div>
            </div>
        )
    )
}
