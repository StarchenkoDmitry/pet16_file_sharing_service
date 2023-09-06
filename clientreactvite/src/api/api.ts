import axios from "axios";
import { GetBackendURL } from "../common/Backend";


const api = axios.create({
    baseURL:GetBackendURL(""),
    withCredentials:true
});

export default api;