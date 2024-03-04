import { useState } from 'react';
import './Toast.css'

interface ToastProps {
    message: string | null;
    type?: 'error' | 'success' | 'info'
}


export default function Toast({message, type = 'info'}: ToastProps) {
    const [showToast, setShowToast] = useState(Boolean(message));
    function closeToast() {
        setShowToast(false);
    }

    const messageTitles = {
        'error': 'Error',
        'success': 'Success',
        'info': 'Info'
    }

    const iconTypeClass = {
        'error': 'fa-triangle-exclamation',
        'success': 'fa-circle-check',
        'info': 'fa-circle-exclamation'
    }

    return (
        showToast && 
        <div className={`toast${showToast && ' show'}`} aria-live='assertive'>
            <div className='icon-wrapper'>
                <i className={`fa-solid ${iconTypeClass[type]}`} />
            </div>
            <div className='message-wrapper'>
                <p className='toast-type'>{messageTitles[type]}</p>
                <p className={`toast-message ${type}`}>{message}</p>
            </div>
            <button onClick={closeToast} className="toast-close">
                <i className="fa-regular fa-circle-xmark" />
            </button>
        </div>
    )
}
