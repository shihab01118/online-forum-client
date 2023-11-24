import axios from "axios";


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_apiURL,
    withCredentials: true
})

export default axiosSecure;