import React, { useState } from "react";

const RegisterModal = props => {
    // const {isOpen} = props;
    const {onClose} = props;
    const {onSubmit} = props;
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [role, setRole] = useState("user");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== repeatPassword) {
            alert("Passwords do not match");
            return;
        } else {
            onSubmit(email, password, role);
        }
        // onClose();
    }
    return (
        <div className="modal">
            <div className="modal-content">
                
                <form onSubmit={handleSubmit}>
                    <button className="close" onClick={onClose}>Cancel</button>
                    
                    <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <input type="password" value={repeatPassword} placeholder="Repeat password" onChange={e => setRepeatPassword(e.target.value)} />
                    
                   
                    <select style={{height: "100%", marginBottom: '10px', paddingTop: '7px', paddingBottom: '7px', width: "100%"}} defaultValue={"user"} onChange={e => { 
                        setRole(e.target.value);
                    }}>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="user">User</option>
                    </select>


                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterModal;