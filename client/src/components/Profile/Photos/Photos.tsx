import Overlay from '../../shared/Overlay/Overlay';
import Upload from '../../shared/Upload/Upload';
import Photo from './Photo/Photo';
import './Photos.css';
import { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Image } from '../../../types/data';
import { ProfileContextType } from '../../../types/data';
import { useTitle } from '../../../hooks/useTitle';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { timeoutMessage } from '../../../utils/timeoutMessage';
import { successMessages } from '../../../Constants';
import Loader from '../../UI/Loader/Loader';
import Toast from '../../UI/Toast/Toast';
import { useApiUsers } from '../../../api/useApiUser';

export default function Photos() {
    useTitle('Photos')
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<Image | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const timeoutId = useRef();
    const {setUser, isProfileOwner, user} = useOutletContext<ProfileContextType>();
    const userApi = useApiUsers();
    const { saveUser, user: loggedInUser } = useAuthContext();
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const imageData = new FormData();

        selectedFiles.forEach((file) => {
            imageData.append(`files`, file);
        });
        setError(null);
        setSuccess(null);
        setLoading(true);
        userApi.uploadUserPhotos(imageData)
        .then((data) => {
            setUser((prev) => ({...prev, photos: data.photos}))
            timeoutMessage(setSuccess, successMessages.photosUploaded, timeoutId);
        }).catch((err) => {
            timeoutMessage(setError, err.message, timeoutId);
        }).finally(() => {
            setLoading(false);
        });
        setSelectedFiles([]);
    }

    function updateProfilePicture() {
        if (!selectedPhoto) return;
        userApi.updateProfilePicture(selectedPhoto.url).then(() =>{
            setUser((prev) => {
                saveUser({...loggedInUser!, profilePicture: selectedPhoto.url})
                return {...prev, profilePicture: selectedPhoto.url}
            });
        });
        
        setSelectedPhoto(null);
        setShowOverlay(false);
    }

    function deletePhoto(url: string | undefined) {
        if (!url) return;
        setSuccess(null);
        userApi.deleteProfilePhoto(url).then((data) => {
            setUser((prev) => ({...prev, photos: data.photos}))
            timeoutMessage(setSuccess, successMessages.photoDeleted, timeoutId);
        }).catch(err => {
            timeoutMessage(setError, err.message, timeoutId);
        });
        setSelectedPhoto(null);
        setShowOverlay(false);
    }

    const handleShowOverlay = (photo: Image) => {
        setSelectedPhoto(photo);
        setShowOverlay(true);
    };

    const handleCloseOverlay = () => {
        setSelectedPhoto(null);
        setShowOverlay(false);
    };

    return (

        <div className="photos-wrapper">
            {loading && <Loader size='large' />}
            {success && <Toast type='success' message={success} />}
            {error && <Toast type='error' message={error} />}
            { isProfileOwner && !loading &&
                <form onSubmit={handleSubmit} className="photo-form" encType="multipart/form-data">
                    <Upload
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                    />
                    { selectedFiles.length > 0 &&
                        <button className="photo-upload-button">Confirm Upload</button>
                    }
                </form>
            }   
            <section className="photos">
                <div className="photos-container">
                    {user?.photos.map((photo) => (
                        <Photo photo={photo} key={photo._id} showOverlayOnCLick={handleShowOverlay.bind(null, photo)} />
                    ))}

                    {showOverlay && (
                        <Overlay
                            isOpen={showOverlay}
                            onClose={handleCloseOverlay}
                        >
                            <Photo photo={selectedPhoto}/>
                        {isProfileOwner &&
                            <>
                                <button onClick={updateProfilePicture} className="confirm-photo-button">Set as Profile picture</button>
                                <button onClick={() => deletePhoto(selectedPhoto?.url)} className="delete-photo-button">Delete Photo</button>
                            </>
                        }
                        </Overlay>
                    )}
                </div>
            </section>
        </div>
    );
}
