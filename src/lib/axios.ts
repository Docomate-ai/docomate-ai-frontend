import axios from "axios";

axios.defaults.baseURL = "http://localhost:7070";
axios.defaults.withCredentials = true;

export default axios;
