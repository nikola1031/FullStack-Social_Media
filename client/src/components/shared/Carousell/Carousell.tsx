import { useState } from 'react';
import './Carousell.css';

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
        <div className="carousell-wrapper">
            <img className="carousell-image" src={images[currentIndex]} alt="post image" />
            <button onClick={moveLeft} className="carousell-button carousell-left">
                <i className="fa-solid fa-circle-chevron-left"></i>
            </button>
            <button onClick={moveRight} className="carousell-button carousell-right">
                <i className="fa-solid fa-circle-chevron-right"></i>
            </button>
        </div>
    )
}