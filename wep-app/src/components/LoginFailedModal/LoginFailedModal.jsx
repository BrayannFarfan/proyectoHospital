import './LoginFailedModal.css'


export  const LoginFailedModal = ({ isOpen , onClose }) => {
    if ( !isOpen )return null


    return(
        <>
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Login Failed</h2>
            <p>Invalid email or password. Please try again.</p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
        </>
    )
}