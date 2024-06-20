import React, { useState } from "react";

const ModalAddAttendee = props => {
    // const {isOpen} = props;
    const {onClose} = props;
    const {onSubmit} = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(name, email, phone, city)
        // onClose();
    }
    return (
        <div className="modal">
            <div className="modal-content">
                
                <form onSubmit={handleSubmit}>
                    <button className="close" onClick={onClose}>Cancel</button>
                    <input type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
                    <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input type="text" value={phone} placeholder="Phone" onChange={e => setPhone(e.target.value)} />
                    <input type="text" value={city} placeholder="City" onChange={e => setCity(e.target.value)} />
                    <button type="submit">Add attendee</button>
                </form>
            </div>
        </div>
    )
}

export default ModalAddAttendee;