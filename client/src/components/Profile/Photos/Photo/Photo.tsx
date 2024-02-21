import './Photo.css';
import { Image } from '../../../../types/data';
interface PhotoProps {
    photo: Image | null;
    showOverlayOnCLick?: () => void;
}

export default function Photo({photo, showOverlayOnCLick}: PhotoProps) {
    return (
        <article onClick={showOverlayOnCLick} className='photo-container'>
            <img className='photo-img' src={photo?.url} alt="user photo" />
        </article>
    )
}
