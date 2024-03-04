import { PropsWithChildren, useEffect } from 'react';
import './Overlay.css';

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
      <div className="overlay">
        <div className="backdrop" onClick={onClose}>
          <div className='overlay-container'>
              <div className='overlay-content' onClick={handleOverlayClick}>
                <button className='close-button' onClick={onClose}><i className="fa-solid fa-x"></i></button>
                {children}
              </div>
          </div>
        </div>
      </div>
    )
};