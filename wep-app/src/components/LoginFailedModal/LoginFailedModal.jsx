import './LoginFailedModal.css'


export  const LoginFailedModal = ({ isOpen , onClose, title, message, primaryButtonText, onPrimaryButtonClick }) => {
    if ( !isOpen )return null


    return(
        <>
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="modal-buttons">
                {primaryButtonText && (
                <button onClick={onPrimaryButtonClick || onClose}>
                    {primaryButtonText}
                </button>
                )}    
            </div>
        </div>
    </div>
        </>
    )
}