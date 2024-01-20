import Overlay from '../shared/Overlay/Overlay';
import Upload from '../shared/Upload/Upload';
import Photo from './Photo/Photo';
import './Photos.css';
import { useEffect, useState } from 'react';
import * as dataApi from '../../api/data';
import { useParams } from 'react-router-dom';
import { Image } from '../../types/data';


export default function Photos() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<Image | null>(null);
    const [photos, setPhotos] = useState<Image[]>([]);
    const { id } = useParams();
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const imageData = new FormData();

        selectedFiles.forEach((file) => {
            imageData.append(`files`, file);
        });

        dataApi.uploadUserPhotos(imageData).then((data) => setPhotos(data.photos));
        setSelectedFiles([]);
    }

    async function fetchPhotos() {
        await dataApi.getProfilePhotos(id!).then((data) => setPhotos(data.photos));
    }

    useEffect(() => {
        fetchPhotos();
    }, [])

    function setProfilePicture() {
        if (!selectedPhoto) return;
        console.log('set profile picture');
    }

    function deletePhoto(url: string | undefined) {
        if (!url) return;
        dataApi.deleteProfilePhoto(url).then((data) => setPhotos(data.photos))
    }

    const [showOverlay, setShowOverlay] = useState(false);

    const handleShowOverlay = (photo: Image) => {
        setSelectedPhoto(photo);
        setShowOverlay(true);
    };

    const handleCloseOverlay = () => {
        setSelectedPhoto(null);
        setShowOverlay(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="photo-form" encType="multipart/form-data">
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
                        <button onClick={() => deletePhoto(selectedPhoto?.url)} className="delete-photo-button">Delete Photo</button>
                    </Overlay>
                )}
            </section>
        </>
    );
}
