import logo from './logo.svg';
import './App.css';
import AttendeeTable from './AttendeeTable';
import Attendee from './Attendee';
import { useState } from 'react';
import Repo from './Repo'

// const InitialList = [
//   {name: 'Razvan', email: 'uzumrazvanviorel@gmail.com', phone: '+40734393899'},
//   {name: 'Cristi', email: 'iaocristi@yahoo.com', phone: '+40738452403'},
//   {name: 'Teodora', email: 'teodora.vlad@stud.ubbcluj.ro', phone: '0739583729'}
// ]

// const AttendeeList = [
//   new Attendee('Razvan', 'uzumrazvanviorel@gmail.com', '+4073493899'),
//   new Attendee("Ioan", 'vladioan@yahoo.com', '0845329143'),
//   new Attendee("test1", "aaa@outlook.com", "349892834")
// ]



function App() {
  let repository = new Repo;

  return (
    // <title>Webinar attendees</title>
    <div className="App">
      <div className="content">
        <div className = "information">
          <h1>Attendees</h1>
          <div className="table">
            {/* <AttendeeTable attendeeRepository={repository}> </AttendeeTable> */}
            <AttendeeTable></AttendeeTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
