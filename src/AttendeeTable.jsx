import React, { useEffect, useRef, useState, setState } from 'react'
import Attendee from './Attendee'
import ModalAddAttendee from './ModalAddAttendee'
import ModalUpdateAttendee from './ModalUpdateAttendee';
import CityChart from './CityChart';
import Service from './Service';
// import validator from 'validator';
import InfiniteScroll from 'react-infinite-scroll-component';

function AttendeeTable({logOutFunction, userName, userRole}) {
    
    const [attendeesPerPage, setAttendeesPerPage] = useState(10);
    const [showCityChart, setShowCityChart] = useState(false);
    // const [attendeeList, setAttendeeList] = useState([
    // new Attendee('Razvan', 'uzumrazvanviorel@gmail.com', '+40734393899', 'Satu Mare'),
    // new Attendee("Vlad", 'vladioan@yahoo.com', '0845329143', 'Timisoara'),
    // new Attendee("test", "aaaiao@outlook.com", "349892834")]);

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
    // const [selectedAttendeeId, setSelectedAttendeeId] = useState(null);
    const [searchString, setSearchString] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [attendeeNumber, setAttendeeNumber] = useState(0);
    // const [allAttendees, setAllAttendees] = useState([new Attendee(1, 'Razvan', 'uzumrazvanviorel@gmail.com', '+40734393899', 'Satu Mare')]);
    const [chartData, setChartData] = useState({});

    const service = new Service();
    const [serverStatus, setServerStatus] = useState(false);

    const checkServerStatus = async () => {
        try{
        const status = await service.checkServerStatus();
        setServerStatus(status);
        // console.log("Server status: ", status);
        return status;
        }
        catch(e) {
            console.log("Error checking server status: ", e);
            return false;
        }
    }

    useEffect(() => async () => {

        try{
            await checkServerStatus();
        } catch(e) {
            console.log("Error checking server status: ", e);
        }
        const interval = setInterval(async () => {
            try{
                await checkServerStatus();
            } catch(e) {
                console.log("Error checking server status: ", e);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // const [attendeeList, setAttendeeList] = useState([new Attendee(1, 'Razvan', 'uzumrazvanviorel@gmail.com', '+40734393899', 'Satu Mare')]);
    const [attendeeList, setAttendeeList] = useState([new Attendee(1, 'Loading...', 'Loading...', 'Loading...', 'Loading...')]);


// paginare noua
    const [infiniteScrollCurrentPage, setInfiniteScrollCurrentPage] = useState(0);
    async function addAnotherPage(currentList, pageToAdd) {
        // console.log("add another page page to add: ", pageToAdd);
        var newList = JSON.parse(JSON.stringify(currentList));
        const result = await service.getAllAttendeesFilteredAndPaged(searchString, pageToAdd, attendeesPerPage);
        // console.log("beforeList: ", newList, " result: ", result);
        newList = [...newList, ...result];
        // console.log("afterList: ", newList);
        // console.log("added another page: ", currentPage, ", final list: ", newList);
        return newList;
    }
    useEffect(() => {
        service.getAttendeeNumber().then((result) => {
            // console.log(result);
            setAttendeeNumber(result);
        });
    }, []);
    function canLoadMoreInfiniteScroll() {
        // console.log("canLoadMoreFunction", attendeeNumber > (infiniteScrollCurrentPage+1)*attendeesPerPage);
        return attendeeNumber > (infiniteScrollCurrentPage+1)*attendeesPerPage;
    }
    async function loadMoreInfiniteScroll() {
        // console.log("wtf In load more infinite scroll");
        // return;
        // console.log(attendeeNumber, (infiniteScrollCurrentPage+1)*attendeesPerPage);
        if(attendeeNumber > (infiniteScrollCurrentPage+1)*attendeesPerPage) {
            // console.log("loading more data...")
            const nextPage = infiniteScrollCurrentPage + 1;
            var newList = JSON.parse(JSON.stringify(attendeeList));
            newList = await addAnotherPage(newList, nextPage);
            setInfiniteScrollCurrentPage(nextPage);
            // console.log("setting attendee list in loadmoreinfinitescroll...")
            setAttendeeList(newList);
        }
    }
    useEffect(() => {
        resetInfiniteScroll();
    }, [searchString]);
    async function resetInfiniteScroll() {
        setInfiniteScrollCurrentPage(0);
        var newAttendeeList = [];
        newAttendeeList = await addAnotherPage(newAttendeeList, 0);
        setAttendeeList(newAttendeeList);
    }
    

    async function refreshData () {
        if(serverStatus == false) {
            return;
        } else {
            // console.log("In refresh data server is up");
        }
        
        // console.log("REFRESING DATA");
        // paginare noua
        
        var newAttendeeList = [];
        for(let i = 0; i <= infiniteScrollCurrentPage; i++) {
            newAttendeeList = await addAnotherPage(newAttendeeList, i);
        }
        // ceva nu face bine aici
        // console.log("infiniteScrollCurrentPage ", infiniteScrollCurrentPage)
        // console.log("newAttendeeListInRefresh ", newAttendeeList)
        setAttendeeList(newAttendeeList);

        //aici e cu paginare veche
        // service.getAllAttendeesFilteredAndPaged(searchString, currentPage, attendeesPerPage).then((result) => {
        //     setAttendeeList(result);
        // });


        service.getAttendeeNumber().then((result) => {
            // console.log(result);
            setAttendeeNumber(result);
        });
        service.getChartData().then((result) => {
            setChartData(result);
        });
        // console.log("chart data: ", chartData);
    }

    useEffect(() => {
        // service.getAllAttendeesFilteredAndPaged(searchString, currentPage, attendeesPerPage).then((result) => {
        //     // console.log(result);
        //     setAttendeeList(result);
        // });
        // service.getAttendeeNumber().then((result) => {
        //     // console.log(result);
        //     setAttendeeNumber(result);
        // });
        refreshData().then(() => {});
        // service.getAllAttendees().then((result) => {
        //     console.log("result: ", result);
        //     setAttendeeList(result);
        // });
    }, [searchString, currentPage, attendeesPerPage, serverStatus]);

    useEffect(() => {
        // service.getAllAttendees().then((result) => {
        //     console.log("result: ", result);
        //     console.log("filteredAndPaged: ", attendeeList);
        //     setAllAttendees(result);
        // });
    }, []);


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

    const handleAddSubmit = (name, email, phone, city) => {
        if(name=="" || email=="" || phone=="") {
            alert("Some of the fields are empty");
        } else if(!isMobilePhone(phone)) {
            alert("The phone number you entered is invalid");
        } else if(!isEmailAddress(email)) {
            alert("The email you entered is invalid");
        } else {
            const newAttendee = new Attendee(-1, name, email, phone, city);
            setAttendeeList([...attendeeList, newAttendee]);
            service.addAttendee(name, email, phone, city).then(() => {
                // service.getAllAttendeesFilteredAndPaged(searchString, currentPage, attendeesPerPage).then((result) => {
                //     setAttendeeList(result);
                // });
                // service.getAttendeeNumber().then((result) => {
                //     setAttendeeNumber(result);
                // });
                // service.getAllAttendees().then((result) => {
                //     setAllAttendees(result);
                // });
                refreshData().then(() => {});
            });
            setIsAddModalOpen(false);
        }
    }

    function filteredAttendees () {
        return attendeeList.map(attendee => {
            if(searchString != '' && !(attendee.name.includes(searchString) || attendee.email.includes(searchString)
            || attendee.phone.includes(searchString) || attendee.city.includes(searchString))) {
                return null;
            }
            else
                return attendee;
        }).filter(attendee => attendee !== null);
    }

    const handleCloseModalUpdate = () => {
        setIsUpdateModalOpen(false);
    }

    const handleUpdateSubmit = (name, email, phone, city) => {
        if(name=="" || email=="" || phone=="") {
            alert("Some of the fields are empty");
        } else if(!isMobilePhone(phone)) {
            alert("The phone number you entered is invalid");
        } else if(!isEmailAddress(email)) {
            alert("The email you entered is invalid");
        } else {
            const selectedAttendeeId = attendeeList[selectedAttendeeIndex].id;
            service.updateAttendee(selectedAttendeeId, name, email, phone, city).then(() => {
                refreshData().then(() => {});
            });
            setIsUpdateModalOpen(false);

            // offline
            const updatedAttendees = attendeeList.map((attendee, index) => {
                if(index == selectedAttendeeIndex) {
                    return new Attendee(attendeeList[selectedAttendeeIndex].id, name, email, phone, city);
                } else 
                    return attendee;
            });
            setAttendeeList(updatedAttendees);
        }
    }

    function renderAttendees() {
        return attendeeList.map((attendee, index) => {
                     return <tr>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>{attendee.phone}</td> 
                <td>{attendee.city}</td> 
                {attendee.id != -1 && (
                        <td>
                        <button className='edit-button' onClick={() => {
                            const constNewList = attendeeList.filter((_, i) => i !== index);
                            setAttendeeList(constNewList);
                            service.deleteAttendee(attendee.id).then(() => {
                                // service.getAllAttendeesFilteredAndPaged(searchString, currentPage, attendeesPerPage).then((result) => {
                                //     setAttendeeList(result);
                                // });
                                // service.getAttendeeNumber().then((result) => {
                                //     setAttendeeNumber(result);
                                // });
                                // service.getAllAttendees().then((result) => {
                                //     setAllAttendees(result);
                                // });
                                refreshData().then(() => {});
                            });
                    }} data-testid={`delete-button-${index}`}>Delete</button>
                    
                    <button className='edit-button' onClick={() => {
                            // handleOpenUpdate(attendee.id);
                            handleOpenUpdate(index);
                    }} data-testid={`update-button-${index}`}>Update</button></td>
                )}
                
            </tr>
        });

        // return filteredAttendees().map((attendee, index) => {
        //     if(!(index >= currentPage*attendeesPerPage && index<=(currentPage+1)*attendeesPerPage-1)) {
        //         return null;
        //     } else
        //     return <tr>
        //         <td>{attendee.name}</td>
        //         <td>{attendee.email}</td>
        //         <td>{attendee.phone}</td> 
        //         <td>{attendee.city}</td> 
                
        //         <td>
        //             <button className='edit-button' onClick={() => {
        //                 // const constNewList = attendeeList.filter((_, i) => i !== index);
        //                 // setAttendeeList(constNewList);
                        
        //         }} data-testid={`delete-button-${index}`}>Delete</button>
                
        //         <button className='edit-button' onClick={() => {
        //                 handleOpenUpdate(index);
        //         }} data-testid={`update-button-${index}`}>Update</button></td>
                
        //     </tr>
        // });
    }
    return (
        <>
        <div style={{display: "flex"}}>
            <h2 style={{color: 'darkgray'}}>Welcome, {userName} ({userRole})</h2>
        <button style={{marginLeft: 'auto', backgroundColor: '#ff4a4a', marginTop: '15px'}} onClick = {() => {logOutFunction()}}>Log out</button>
        </div>
        {serverStatus == false && (<h2 style={{color: '#ff4a4a'}}>Connecting to the server...</h2>)}
        <h1>Attendees</h1>
        <div style={{display: "flex"}}>
        <button style={{marginBottom: '20px'}} onClick={() => setShowCityChart(!showCityChart)}>{showCityChart == true ? 'Hide city chart' : 'Show city chart'}</button>
        </div>
        
        {showCityChart == true && (
        <div>
        <CityChart chartData={chartData}/>
        {/* <CityChart allAttendees={attendeeList}/> */}
        </div>
        )}
        <div style={{marginTop: 25, marginBottom: 25, display:'flex'}}>
            <button style={{}} type="button" onClick={() => {
                        handleOpenAdd();}}>Add an attendee manually</button>
        </div>
        { attendeeNumber > 0 && (<input value={searchString} className="search" placeholder='Search here for a specific person' onChange={e => setSearchString(e.target.value)}></input>)}
        { attendeeList.length > 0 && (
            <>
            <table className="webinartable">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>City</th>
                    <th>Edit</th>
                </tr>
                {
                renderAttendees()
                }
                
                
            </table>
            {/* <ul className='pagination' style={{ display: 'flex', listStyle: 'none' }}>
                <li className="page-item">
                <select style={{height: "100%"}} defaultValue={5} onChange={e => { 
                    setAttendeesPerPage(e.target.value); 
                    if(currentPage >= Math.ceil(filteredAttendees().length / e.target.value)) 
                        setCurrentPage(Math.ceil(filteredAttendees().length / e.target.value) - 1);
                    }}>
                    <option value="1">1 per page</option>
                    <option value="3">3 per page</option>
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="15">15 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                    <option value="100">100 per page</option>
                    <option value="1000">1000 per page</option>
                </select>
                </li>
                {Array.from({length: Math.ceil(attendeeNumber / attendeesPerPage)}, (_, index) =>
                (
                    <li key={index} className='page-item'>
                        <button className={`page-button ${currentPage == index ? 'active-page' : ''}`} id={`page-button-${index+1}` } data-testid={`page-button-${index+1}` } onClick={() => {setCurrentPage(index)}}>{index+1}</button>
                    </li>
                )
                )}
            </ul> */}

            {/* <button style = {{marginTop: '25px', marginBottom: '25px'}} onClick={loadMoreInfiniteScroll()}>Load more</button> */}
            
            </>
        
    ) || (
        <div>
            <h2 style={{color: 'grey'}}>No attendees found</h2>
        </div>
    )}
    {/* <button style = {{marginTop: '25px', marginBottom: '25px'}} onClick={loadMoreInfiniteScroll}>Load more</button> */}
    
    <InfiniteScroll dataLength={attendeeList.length}
        next={loadMoreInfiniteScroll}
        hasMore={canLoadMoreInfiniteScroll}
        >
        
    </InfiniteScroll>

    {isAddModalOpen && (<ModalAddAttendee onClose={handleCloseModalAdd} onSubmit={handleAddSubmit}></ModalAddAttendee>)}
    {isUpdateModalOpen && (<ModalUpdateAttendee onClose={handleCloseModalUpdate} onSubmit={handleUpdateSubmit} attendee={attendeeList[selectedAttendeeIndex]}></ModalUpdateAttendee>)}
    </>
    )
}

export default AttendeeTable;