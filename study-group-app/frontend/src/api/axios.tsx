import axios from "axios";

const BASE_URL:string  = import.meta.env.VITE_AXIOS_BASE_URL;


export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})