import styles from './Photo.module.css';
import { Image } from '../../../../types/data';
interface PhotoProps {
    photo: Image | null;
    enlarged?: boolean
    showOverlayOnCLick?: () => void;
}

export default function Photo({photo, enlarged = false, showOverlayOnCLick}: PhotoProps) {
    return (
        <article onClick={showOverlayOnCLick} className={styles['photo-container']}>
            <img className={`${styles['photo-img']} ${enlarged ? styles['enlarged'] : ''}`} src={photo?.url} alt="user photo" />
        </article>
    )
}
