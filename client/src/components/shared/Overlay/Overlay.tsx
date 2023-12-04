import { ReactNode } from 'react';
import './Overlay.css';

interface OverlayProps {
    children: ReactNode;
    isVisible: boolean;
    onClose: () => void;
}
export default function Overlay({ children, isVisible, onClose }: OverlayProps) {
    return (
        <div className={`overlay ${isVisible ? 'show' : ''}`}>
            <div className="overlay-content">
                <button className="close-btn" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};