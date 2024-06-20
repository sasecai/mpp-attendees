import axios from "axios";
import Attendee from "./Attendee";
import site from "./backend"

class Service {
    tokenHeaders = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        }
     }
    requestQueue;
    queueKey = 'queuedRequests'

    constructor() {
        this.requestQueue = JSON.parse(localStorage.getItem(this.queueKey)) || [];
    }

    async saveQueuedRequests() {
        if(this.requestQueue.length === 0) {
            localStorage.removeItem(this.queueKey);
            return;
        }
        localStorage.setItem(this.queueKey, JSON.stringify(this.requestQueue));
    }

    async loadQueuedRequests() {
        this.requestQueue = JSON.parse(localStorage.getItem(this.queueKey)) || [];
    }

    async enqueueRequest(request) {
        this.requestQueue.push(request);
        await this.saveQueuedRequests();
    }

    async processQueuedRequests() {
        this.loadQueuedRequests();
        while(this.requestQueue.length > 0) {
            const request = this.requestQueue.shift();
            try{
                await axios(request);
            }
            catch(e) {
                console.log("Error processing request: ", e);
                this.enqueueRequest(request);
                break;
            }
        }
        this.saveQueuedRequests();
    }

    async checkServerStatus() {
        try{
            await axios.get(site + "/status", this.tokenHeaders);
            this.loadQueuedRequests();
            await this.processQueuedRequests();
            // console.log("E up and running serveru");
            return true;
        }
        catch(e) {
            // console.log("E down serveru");
            return false;
        }
    }


    getAllAttendees = async() => {
        // console.log("Service.getAllAttendees");
        // console.log("iaoo");
        
        // console.log(response.data);
        
        const attendees = [];
        try{
            const response = await axios.get(site + `/attendees`, this.tokenHeaders);
            // console.log(response.data);
            for(const att of response.data) {
                attendees.push(new Attendee(att.id, att.name, att.email, att.phone, att.city));
            }
        } catch(e) {

        }
        return attendees;
     }

     getAttendeeNumber = async() => {
        try{
        const response = await axios.get(site + `/attendee-number`, this.tokenHeaders);
        return response.data.numberOfAttendees;}
        catch(e) {
            return 0;
        }
    }

     getAllAttendeesFilteredAndPaged = async(searchString, pageNumber, itemPerPage) => {
        pageNumber = pageNumber + 1;
        const requestData = {
            searchString: searchString,
            pageNumber: pageNumber,
            itemsPerPage: itemPerPage
        }
        const queryString = `?searchString=${searchString}&pageNumber=${pageNumber}&itemsPerPage=${itemPerPage}`;

        
        // Make the GET request with query parameters
        
        
        const attendees = [];
        try {
            const response = await axios.get(site + `/attendees/filtered-and-paged${queryString}`, this.tokenHeaders);
            for(const att of response.data) {
                attendees.push(new Attendee(att.id, att.name, att.email, att.phone, att.city));
            }
            return attendees;
        }   catch(e) {
            return [];
        }
     }

     deleteAttendee = async(id) => {
        try{
        await axios.delete(site + `/attendees/${id}`, this.tokenHeaders);}
        catch(e) {
            const queuedRequest = {
                method: 'delete',
                url: site + `/attendees/${id}`,
                headers: this.tokenHeaders
            }
            this.enqueueRequest(queuedRequest);
            // throw e;
        }
     }

     addAttendee = async(name, email, phone, city) => {
        const requestData = {
            name: name,
            email: email,
            phone: phone,
            city: city
        }
        try{
        await axios.post(site + "/attendees", requestData, this.tokenHeaders);
        }
        catch(e) {
            const queuedRequest = {
                method: 'post',
                url: site + "/attendees",
                data: requestData,
                headers: this.tokenHeaders
            }
            this.enqueueRequest(queuedRequest);
            // throw e;
        }
    }

     updateAttendee = async(id, name, email, phone, city) => {
        const requestData = {
            name: name,
            email: email,
            phone: phone,
            city: city
        }
        try{
            await axios.put(site + `/attendees/${id}`, requestData, this.tokenHeaders);
        } catch(e) {
            const queuedRequest = {
                method: 'put',
                url: site + `/attendees/${id}`,
                data: requestData,
                headers: this.tokenHeaders
            }
            this.enqueueRequest(queuedRequest);
            // throw e;
        }
     }

     getAttendee = async(id) => {
        try{
            const response = await axios.get(site + `/attendees/${id}`, this.tokenHeaders);
            return new Attendee(response.data.id, response.data.name, response.data.email, response.data.phone, response.data.city);
        } catch(e) {
            return null;
        }
    }


     getChartData = async() => {
        try{
        const response = await axios.get(site + `/attendees/chart`, this.tokenHeaders);
        // console.log("RESPONSE DATA: ", response.data);
        // return response.data.reduce((counts, ct) => {
        //     console.log("ct: " , ct);
        //     const property = ct.city;
        //     counts["iao"] = (counts[property] || 0) + 1;
        // });
        return response.data;
        } catch(e) {
            return null;
        }
     }
     
}

export default Service;
