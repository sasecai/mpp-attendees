import axios from "axios";
import Attendee from "./Attendee";
// import jwt from 'jsonwebtoken';
import site from "./backend";
// const site = "http://localhost:3000";

class UserService {
    tokenHeaders;

     checkServerStatus = async () => {
        try{
            await axios.get(site + "/status", this.tokenHeaders);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    LogIn = async(email, password) => {
        const requestData = {
            email: email,
            password: password
        }
        try{
            // console.log("Logging in...")
            const response = await axios.post(site + "/login", requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200)
                {
                    // await new Promise(resolve => setTimeout(resolve, 1000));
                    // console.log('setting in localStorage: ', response.data.token);
                    localStorage.setItem("token", response.data.token);
                    this.tokenHeaders = {
                        headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                        }
                    }
                    // console.log('done setting in localStorage: ', response.data.token);
                    return true;
                }
            return response.data;
        } catch(e) {
            throw e;
        }
    }
    Register = async(email, password, role) => {
        const requestData = {
            email: email,
            password: password,
            role: role
        }
        try{
            const response = await axios.put(site + "/register", requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Register in user service");
            console.log("USER SERVICE ", response);
            if(response.status === 200)
                {
                    // await new Promise(resolve => setTimeout(resolve, 1000));
                    localStorage.setItem("token", response.data.token);
                    this.tokenHeaders = {
                        headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                        }
                    }
                    return true;
                }
            else
                return response.data;
        } catch(e) {
            console.log("Eroare in user service :/");
            throw new Error("An account already exists with this email");
        }
    }
    isLoggedIn = () => {
        if(localStorage.getItem("token") === null) {
            return false;
        }
        this.tokenHeaders = {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
            }
        }
        return true;
    }
    getRole = async() => {
        try {
            console.log("Local storage length: ", localStorage.length)
            for(let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                console.log(key, localStorage.getItem(key));
            }
            
            console.log("Getting role...", this.tokenHeaders)
            const response = await axios.get(site + "/roleFromToken", this.tokenHeaders);
            console.log("Got role...")
            if(response.status === 401)
                return false;
            return response.data;
        } catch(e) {
            return false;
        }
    }
    getEmail = async() => {
        // return "somebody";
        try {
            const response = await axios.get(site + "/userFromToken", this.tokenHeaders);
            if(response.status === 401)
                return false;
            // console.log("Raspuns de la server: ", response.data);
            return response.data;
        } catch(e) {
            return false;
            // return "no connection to the server..."
        }


        // const token = localStorage.getItem("token");
        // return jwt.verify(token, 'secret').email;
        // return localStorage.getItem("token").email;

        // if(localStorage.getItem("token") === null) {
        //     return "nobody";
        // }else
        return "somebody";
    }
    LogOut = () => {
        console.log("Logging out...")
        localStorage.removeItem("token");
    }
}

export default UserService;
