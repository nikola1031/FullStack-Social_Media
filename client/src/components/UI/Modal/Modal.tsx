import { useEffect } from 'react';
import styles from './Modal.module.css';

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
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div role='dialog' autoFocus className={styles['modal-container']} onClick={handleModalClick}>
                <header className={styles['modal-header']}>
                    <h1 className={styles['modal-h1']}>Delete Action</h1>
                </header>
                <div className={styles['modal-body']}>
                    <h3 className={styles['modal-h3']}>Are you sure you want to do this?</h3>
                </div>
                <div className={styles['modal-buttons']}>
                    <button onClick={handleOnAction} className={styles['delete-btn']}>Delete</button>
                    <button onClick={onClose} className={styles['cancel-btn']}>Cancel</button>
                </div>
            </div>
        </div>
        )
    )
}
