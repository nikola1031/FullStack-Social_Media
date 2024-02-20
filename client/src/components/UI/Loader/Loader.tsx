import './Loader.css';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
}

export default function Loader({size = 'medium'}: LoaderProps) {
    const sizes = {
        small: '24px',
        medium: '48px',
        large: '72px'
    }
    
  return (
    <div className='loader-container'>
      <div style={{width: sizes[size], height: sizes[size] }} className="loader"></div>
    </div>
  )
}
