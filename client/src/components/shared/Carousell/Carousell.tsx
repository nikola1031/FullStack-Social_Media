import styles from './Carousell.module.css';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface CarousellProps {
  images: string[];
}

export default function Carousell({ images }: CarousellProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetching each image from firebase storage is really slow so the carousell takes a while to "warm up" :@

    function moveLeft() {
        setCurrentIndex((index) => index === 0 ? images.length - 1 : currentIndex - 1);
    }

    function moveRight() {
        setCurrentIndex((index) => index === images.length - 1 ? 0 : currentIndex + 1);
    }

    return (
        <div className={styles["carousell-wrapper"]}>
            <img className={styles["carousell-image"]} src={images[currentIndex]} alt="post image" />
            <button onClick={moveLeft} className={`${styles["carousell-button"]} ${styles["carousell-left"]}`}>
                <span className={styles["carousell-arrow-left"]}>
                    <FontAwesomeIcon icon={faChevronCircleLeft} />
                </span>
            </button>
            <button onClick={moveRight} className={`${styles["carousell-button"]} ${styles["carousell-right"]}`}>
                <span className={styles["carousell-arrow-right"]}>
                    <FontAwesomeIcon icon={faChevronCircleRight} />
                </span>
            </button>
        </div>
    )
}