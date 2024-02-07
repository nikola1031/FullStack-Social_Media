import { Link } from 'react-router-dom';
import './Avatar.css';
import PathConstants from '../../../routes/PathConstants';

interface AvatarProps {
    image: string | undefined;
    withLinkTo?: string;
    large?: boolean;
}

export default function Avatar({image, withLinkTo, large}: AvatarProps) {
  return (
    withLinkTo ?
        <Link to={`/${PathConstants.Profile}/${withLinkTo}`}>
            <img
                className={`user-avatar ${large ? 'large' : ''}`}
                src={image || '/assets/default_avatar.jpg'}
                alt="avatar"
            />
        </Link> :
        <img
            className={`user-avatar ${large ? 'large' : ''}`}
            src={image || '/assets/default_avatar.jpg'}
            alt="avatar"
        />
  )
}
