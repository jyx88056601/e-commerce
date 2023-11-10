import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "/", 
    headers:{
        "Content-type": "application/json", // api request by json format
    }
})
 
export default apiClient;