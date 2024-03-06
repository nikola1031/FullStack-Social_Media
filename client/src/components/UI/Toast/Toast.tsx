import { useState } from 'react';
import styles from './Toast.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faCircleXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


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

    const iconType = {
        'error': {class: 'triangle-exclamation', element: faTriangleExclamation},
        'success': {class: 'circle-check', element: faCircleCheck},
        'info': {class: 'circle-exclamation', element: faCircleExclamation}
    }

    return (
        showToast && 
        <div className={`${styles.toast}${showToast ? ` ${styles.show}` : ''}`} aria-live='assertive'>
            <div className={styles['icon-wrapper']}>
                <span className={styles[iconType[type].class]}>
                    <FontAwesomeIcon icon={iconType[type].element} />
                </span>
            </div>
            <div className={styles['message-wrapper']}>
                <p className={styles['toast-type']}>{messageTitles[type]}</p>
                <p className={`${styles['toast-message']} ${styles[type]}`}>{message}</p>
            </div>
            <button onClick={closeToast} className={styles['toast-close']}>
                <span className={styles['circle-xmark']}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </span>
            </button>
        </div>
    )
}
