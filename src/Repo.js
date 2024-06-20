// import Attendee from "./Attendee";
// import React, { useState, setState } from 'react';

// export default class Repo extends React.Component {
//     constructor(props) {
//         super(props);
        
//         this.state = {
//             AttendeeList: [
//                 new Attendee('Razvan', 'uzumrazvanviorel@gmail.com', '+4073493899'),
//                 new Attendee("Vlad", 'vladioan@yahoo.com', '0845329143'),
//                 new Attendee("test", "aaa@outlook.com", "349892834")
//               ]
//         }
//     }
//     handleDelete(email) {
//         var index = this.state.AttendeeList.indexOf(email);
//         var newList = this.state.AttendeeList;
//         newList.splice(index, 1);
//         this.setState({AttendeeList: newList});
//         // this.state.AttendeeList.splice(index, 1);
//         alert(this.state.AttendeeList.length);
//     }
//     getAttendeeList() {
//         return this.state.AttendeeList;
//     }
// }