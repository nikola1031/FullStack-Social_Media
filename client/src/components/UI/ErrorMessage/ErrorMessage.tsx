import './ErrorMessage.css'

export default function ErrorMessage({error}: {error: string}) {
  return (
    <div className="error-container">
        <i className="fa-solid fa-triangle-exclamation"></i>
        <p className="error-message">{error}</p>
    </div>
  )
}
