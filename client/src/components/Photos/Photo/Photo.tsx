import './Photo.css';

export default function Photo({photo, showOverlayOnCLick}: any) {
    return (
        <article onClick={showOverlayOnCLick} className='photo-container'>
            <img className='photo-img' src={photo.url} alt="user photo" />
        </article>
    )
}
