import React, { useState } from "react";

const LogInModal = props => {
    // const {isOpen} = props;
    // const {onClose} = props;
    const {onSubmit} = props;
    const {clickRegister} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password)
        // onClose();
    }
    return (
        <div className="modal">
            <div className="modal-content">
                
                <form onSubmit={handleSubmit}>
                    {/* <button className="close" onClick={onClose}>Cancel</button> */}
                    
                    <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <p style={{textAlign : 'left', cursor:'pointer', textDecoration:'underline'}} onClick = {clickRegister}>Don't have an account yet?</p>
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    )
}

export default LogInModal;