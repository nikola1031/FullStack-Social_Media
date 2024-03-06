import { PropsWithChildren, useEffect } from 'react';
import styles from './Overlay.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function Overlay ({ isOpen, onClose, children }: PropsWithChildren & OverlayProps) {

  useEffect(() => {
    // Disable scrolling on the body when the overlay is active
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when the overlay is closed
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Prevent closing overlay when clicking inside the modal content
    e.stopPropagation();
  };

  return isOpen &&
    (
      <div className={styles["overlay"]}>
        <div className={styles["backdrop"]} onClick={onClose}>
          <div className={styles['overlay-container']}>
              <div className={styles['overlay-content']} onClick={handleOverlayClick}>
                <button className={styles['close-button']} onClick={onClose}>
                  <span><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></span>
                </button>
                {children}
              </div>
          </div>
        </div>
      </div>
    )
};