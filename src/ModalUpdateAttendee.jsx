import React, { useState } from "react";

const ModalUpdateAttendee = props => {
    // const {isOpen} = props;
    const {attendee} = props;
    const {onClose} = props;
    const {onSubmit} = props;
    const [name, setName] = useState(attendee.name);
    const [email, setEmail] = useState(attendee.email);
    const [phone, setPhone] = useState(attendee.phone);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(name, email, phone)
        // onClose();
    }
    return (
        <div className="modal">
            <div className="modal-content">
                
                <form onSubmit={handleSubmit}>
                    <button className="close" onClick={onClose}>Cancel</button>
                    {/* defaultValue={attendee.name} */}
                    {/* defaultValue={attendee.email} */}
                    {/* defaultValue={attendee.phone} */}
                    {/* {console.log(attendee.name)} */}
                    <input type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
                    <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input type="text" value={phone} placeholder="Phone" onChange={e => setPhone(e.target.value)} />
                    <button type="submit">Update attendee</button>
                </form>
            </div>
        </div>
    )
}

export default ModalUpdateAttendee;