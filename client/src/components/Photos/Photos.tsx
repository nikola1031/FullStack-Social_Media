import Overlay from '../shared/Overlay/Overlay';
import Upload from '../shared/Upload/Upload';
import Photo from './Photo/Photo';
import './Photos.css';
import { useState } from 'react';

export default function Photos() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<{ url: string, _id: string } | null>(null);


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    function setProfilePicture() {
        if (!selectedPhoto) return;

        console.log('set profile picture');
    }

    function deletePhoto() {
        if (!selectedPhoto) return;

        console.log('delete photo');
    }

    const [showOverlay, setShowOverlay] = useState(false);

    const handleShowOverlay = (photo: { url: string, _id: string }) => {
        setSelectedPhoto(photo);
        setShowOverlay(true);
    };

    const handleCloseOverlay = () => {
        setSelectedPhoto(null);
        setShowOverlay(false);
    };


    const photos = [
        { url: 'https://picsum.photos/300/300', _id: '1' },
        { url: 'https://picsum.photos/200/400', _id: '2' },
        { url: 'https://picsum.photos/200/200', _id: '3' },
        { url: 'https://picsum.photos/200/300', _id: '4' },
        { url: 'https://picsum.photos/1600/1200', _id: '5' },
    ];

    return (
        <>
            <form onSubmit={handleSubmit} className="photo-form">
                <Upload
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
                <button className="photo-upload-button">Confirm Upload</button>
            </form>
            <section className="photos">
                {photos.map((photo) => (
                    <Photo photo={photo} key={photo._id} showOverlayOnCLick={handleShowOverlay.bind(null, photo)} />
                ))}
                {showOverlay && (
                    <Overlay
                        isOpen={showOverlay}
                        onClose={handleCloseOverlay}
                    >
                        <Photo photo={selectedPhoto}/>
                        <button onClick={setProfilePicture} className="confirm-photo-button">Set as Profile picture</button>
                        <button onClick={deletePhoto} className="delete-photo-button">Delete Photo</button>
                    </Overlay>
                )}
            </section>
        </>
    );
}
