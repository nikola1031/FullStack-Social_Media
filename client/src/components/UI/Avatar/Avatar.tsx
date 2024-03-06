import { Link } from 'react-router-dom';
import styles from './Avatar.module.css';
import PathConstants from '../../../routes/PathConstants';

interface AvatarProps {
    image: string | undefined;
    withLinkTo?: string;
    size?: 'large' | 'medium' | 'small';
}

export default function Avatar({image, withLinkTo, size = 'medium'}: AvatarProps) {
    const sizeClasses = {   
        large: 'large',
        medium: 'medium',
        small: 'small'
    }

  return (
    withLinkTo ?
        <Link to={`/${PathConstants.Profile}/${withLinkTo}`}>
            <img
                className={`${styles["user-avatar"]} ${styles[sizeClasses[size]] || ''}`}
                src={image || '/assets/default_avatar.jpg'}
                alt="avatar"
            />
        </Link> :
        <img
            className={`${styles["user-avatar"]} ${styles[sizeClasses[size]] || ''}`}
            src={image || '/assets/default_avatar.jpg'}
            alt="avatar"
        />
  )
}
