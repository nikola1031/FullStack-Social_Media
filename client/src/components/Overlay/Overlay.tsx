import { PropsWithChildren } from 'react';
import './Overlay.css';

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function Overlay ({ isOpen, onClose, children }: PropsWithChildren & OverlayProps) {

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Prevent closing overlay when clicking inside the modal content
    e.stopPropagation();
  };

  return isOpen ?
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
    ) : null;
};