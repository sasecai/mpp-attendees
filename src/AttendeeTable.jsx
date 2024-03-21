import React, { useEffect, useRef, useState, setState } from 'react'
import Attendee from './Attendee'
import ModalAddAttendee from './ModalAddAttendee'
import ModalUpdateAttendee from './ModalUpdateAttendee';
// import validator from 'validator';

function AttendeeTable() {
    
    // {attendeeRepository, setAttendeeRepository} = useState(0);
    //const { attendeeRepository } = props;
//    let [attendeeList, setAttendeeList] = attendeeRepository.useState();
    //let {attendeeRepo, setAttendeeRepo} = attendeeRepository.useState();
    //let attendeeList = attendeeRepo.getAttendeeList();
    const attendeesPerPage = 5;

    const [attendeeList, setAttendeeList] = useState([
    new Attendee('Razvan', 'uzumrazvanviorel@gmail.com', '+40734393899', 'Satu Mare'),
    new Attendee("Vlad", 'vladioan@yahoo.com', '0845329143', 'Timisoara'),
    new Attendee("test", "aaaiao@outlook.com", "349892834")]);

    // const [attendeeList, setAttendeeList] = useState([
    // new Attendee('Razvan', 'uzumrazvanviorel@gmail.com', '+40734393899', 'Satu Mare'),
    // new Attendee("Vlad", 'vladioan@yahoo.com', '0845329143', 'Timisoara'),
    // new Attendee("test", "aaaiao@outlook.com", "349892834", 'Constanta'),
    // new Attendee("Ionut", "blublue@gmail.com", "325623424325", 'Brasov'),
    // new Attendee("Iulius", "iulius23@gmail.com", "52345342", 'Cluj-Napoca'),
    // new Attendee("Dalia", "dalisa24@gmail.com", "53453242", 'Cluj-Napoca'),
    // new Attendee("Morena", "morena2@gmail.com", "532452345", 'Brasov'),
    // new Attendee("Vlahuta", "vlah@gmail.com", "523453245", 'Brasov'),
    // new Attendee("Robinson", "robinsoncrusio@yahoo.com", "5324233", 'Cluj-Napoca'),
    // new Attendee("Iulius", "iuli@gmail.com", "23543245324", 'Brasov'),
    // new Attendee("Teodora", "teo@gmail.com", "62343246", 'Brasov'),
    // new Attendee("Adela", "ade@gmail.com", "53425342", 'Bucuresti'),
    // new Attendee("Cristina", "cristinaaaata@gmail.com", "53254325", 'Bucuresti'),
    // new Attendee("Priscilla", "prisci@gmail.com", "45323324", 'Bucuresti'),
    // new Attendee("Yao", "yaochang@gmail.com", "3462236", 'Bucuresti')]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedAttendeeIndex, setSelectedAttendeeIndex] = useState(null);
    const [searchString, setSearchString] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const handleCloseModalAdd = () => {
        setIsAddModalOpen(false);
    }

    const handleOpenAdd = () => {
        setIsAddModalOpen(true);
    }
    const handleOpenUpdate = (index) => {
        setSelectedAttendeeIndex(index);
        setIsUpdateModalOpen(true);
    }

    const isMobilePhone = (phone) => {
        var regex = /^(?=(?:[^\n\d]*\d){5})(?!(?:[^\n\d]*\d){21})(?:\(\+?\d+\)|\+?\d+) ?\d+(?:-\d+)*(?: ?#\d+)?$/i;
        return regex.test( phone );
    }

    const isEmailAddress = (email) => {
        var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
        return regex.test( email );
    }

    const handleAddSubmit = (name, email, phone) => {
        if(name=="" || email=="" || phone=="") {
            alert("Some of the fields are empty");
        } else if(!isMobilePhone(phone)) {
            alert("The phone number you entered is invalid");
        } else if(!isEmailAddress(email)) {
            alert("The email you entered is invalid");
        } else {
            const newAttendee = new Attendee(name, email, phone);
            setAttendeeList([...attendeeList, newAttendee]);
            setIsAddModalOpen(false);
        }
    }

    function filteredAttendees () {
        return attendeeList.map(attendee => {
            if(searchString != '' && !(attendee.name.includes(searchString) || attendee.email.includes(searchString)
            || attendee.phone.includes(searchString))) {
                return null;
            }
            else
                return attendee;
        }).filter(attendee => attendee !== null);
    }

    const handleCloseModalUpdate = () => {
        setIsUpdateModalOpen(false);
    }

    const handleUpdateSubmit = (name, email, phone) => {
        if(name=="" || email=="" || phone=="") {
            alert("Some of the fields are empty");
        } else if(!isMobilePhone(phone)) {
            alert("The phone number you entered is invalid");
        } else if(!isEmailAddress(email)) {
            alert("The email you entered is invalid");
        } else {
            const updatedAttendees = attendeeList.map((attendee, index) => {
                if(index == selectedAttendeeIndex) {
                    return new Attendee(name, email, phone);
                } else 
                    return attendee;
            });
            setAttendeeList(updatedAttendees);
            setIsUpdateModalOpen(false);
        }
    }

    function renderAttendees() {
        return filteredAttendees().map((attendee, index) => {
            // if(searchString != '' && !(name.includes(searchString) || email.includes(searchString)
            // || phone.includes(searchString))) {
            //     return null;
            // }
            // else
            {console.log(currentPage*attendeesPerPage, index,(currentPage+1)*attendeesPerPage-1)}
            if(!(index >= currentPage*attendeesPerPage && index<=(currentPage+1)*attendeesPerPage-1)) {
                return null;
            } else
            return <tr>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>{attendee.phone}</td> 
                {/* <td><button onClick={() => attendeeRepository.handleDelete(email)}>X</button></td> */}
                <td><button onClick={() => {
                        // var index = attendeeList.indexOf(email);
                        // console.log(index);
                        // var newList = attendeeList;
                        // newList.splice(index, 1);
                        // console.log(newList);
                        const constNewList = attendeeList.filter((_, i) => i !== index);
                        // this.setState({newList});
                        // setAttendeeList(newList);
                        setAttendeeList(constNewList);
                        // console.log(attendeeList);
                        
                }} data-testid={`delete-button-${index}`}>Delete</button>
                
                <button onClick={() => {
                        handleOpenUpdate(index);
                        // handleOpenAdd();
                        // console.log(isAddModalOpen);
                        // setAttendeeList(constNewList);
                        
                }} data-testid={`update-button-${index}`}>Update</button></td>
                
            </tr>
        });
    }
    return (
        <>
        { attendeeList.length > 0 && (
            <>
            <input value={searchString} className="search" placeholder='Search here for a specific person' onChange={e => setSearchString(e.target.value)}></input>
            <table className="webinartable">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Edit</th>
                </tr>
                {
                renderAttendees()
                // attendeeList.map(({name, email, phone}, index) => {
                //     return <tr>
                //         <td>{name}</td>
                //         <td>{email}</td>
                //         <td>{phone}</td>
                //         {/* <td><button onClick={() => attendeeRepository.handleDelete(email)}>X</button></td> */}
                //         <td><button onClick={() => {
                //                 // var index = attendeeList.indexOf(email);
                //                 // console.log(index);
                //                 var newList = attendeeList;
                //                 newList.splice(index, 1);
                //                 // console.log(newList);
                //                 setAttendeeList(newList);
                //                 console.log(attendeeList);
                //         }}>X</button></td>
                        
                //     </tr>
                // })
                }
                {/* <tr>
                    <td> Razvan </td>
                    <td> uzumrazvanviorel@gmail.com </td>
                    <td> +40734393899 </td>
                </tr> */}
                
            </table>
            <ul className='pagination' style={{ display: 'flex', listStyle: 'none' }}>
                {Array.from({length: Math.ceil(filteredAttendees().length / attendeesPerPage)}, (_, index) =>
                (
                    <li key={index} className='page-item'>
                        <button className={`page-button ${currentPage == index ? 'active-page' : ''}`} id={`page-button-${index+1}` } data-testid={`page-button-${index+1}` } onClick={() => {setCurrentPage(index)}}>{index+1}</button>
                    </li>
                )
                )}
            </ul>
            </>
        
    ) || (
        <div>
            <h2 style={{color: 'grey'}}>No attendees have registered yet</h2>
        </div>
    )}
    <div style={{marginTop: 25, marginBottom: 25}}>
            <button type="button" onClick={() => {
                        handleOpenAdd();}}>Add an attendee manually</button>
    </div>
    {isAddModalOpen && (<ModalAddAttendee onClose={handleCloseModalAdd} onSubmit={handleAddSubmit}></ModalAddAttendee>)}
    {isUpdateModalOpen && (<ModalUpdateAttendee onClose={handleCloseModalUpdate} onSubmit={handleUpdateSubmit} attendee={attendeeList[selectedAttendeeIndex]}></ModalUpdateAttendee>)}
    </>
    )
}

export default AttendeeTable;