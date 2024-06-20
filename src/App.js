import logo from './logo.svg';
import './App.css';
import AttendeeTable from './AttendeeTable';
import Attendee from './Attendee';
import { useEffect, useState } from 'react';
import UserService from './UserService';
import LogInModal from './LogInModal';
import RegisterModal from './RegisterModal';
// import Repo from './Repo'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userName, setUserName] = useState("nobody");
  const [userRole, setUserRole] = useState("user");

  const userService = new UserService();

  useEffect( () => async() =>{
    setIsLoggedIn(userService.isLoggedIn());
    try{
      console.log("before getEmail")
      const email = await userService.getEmail();
      console.log("after getEmail ", email);
      if(email === false) {
        userService.LogOut();
      } else {
        setUserName(email);
      }
    } catch(e) {

    }
  }, []);

  const handleLogIn = async (email, password) => {
    const serverStatus = await userService.checkServerStatus();
    if(serverStatus === false) {
      alert("No connection to the server. Please try again later.");
      return;
    }
      try {
        console.log("before login")
        const response = await userService.LogIn(email, password);
        console.log("after login")
        // console.log(response);
        if(response === true) {
          setUserName(email);
          console.log("before get role")
          setUserRole(await userService.getRole());
          console.log("after get role")
          setIsLoggedIn(true);
        }else {
          alert(response.message);
        }
      } catch(e) {
        alert("Invalid credentials");
      } 
  }

  const handleRegister = async(email, password, role) => {
    const serverStatus = await userService.checkServerStatus();
    if(serverStatus === false) {
      alert("No connection to the server. Please try again later.");
      return;
    }
    console.log("HANDLE REGISTER");
    try {
      const response = await userService.Register(email, password, role);
      console.log("registerResponse: ", response);
      if(response === true) {
        setUserName(email);
        setUserRole(role);
        setIsLoggedIn(true);
        setIsRegistering(false);
      } else {
        alert(response.message);
      }
    } catch(e) {
      alert(e);
    }
  }

  const logOut = () => {
    userService.LogOut();
    setIsLoggedIn(false);
  }

  const handleStartRegistering = () => {
    setIsRegistering(true);
  }

  const handleCloseRegister = () => {
    setIsRegistering(false);
  }

  return (
    // <title>Webinar attendees</title>
    <div className="App">
      <div className="content">
        <div className = "information">
          
          <div className="table">
            {(isRegistering) && (<RegisterModal onSubmit={handleRegister} onClose = {handleCloseRegister}></RegisterModal>)}
            {(isLoggedIn == false && isRegistering == false) && (<LogInModal onSubmit={handleLogIn} clickRegister={handleStartRegistering}></LogInModal>)}
            {(isLoggedIn && isRegistering == false) && (<AttendeeTable logOutFunction={logOut} userName={userName} userRole={userRole}></AttendeeTable>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
