import axios from "axios";

axios.defaults.baseURL =
  "https://arcane-hollows-46188-ea0f5f3f003d.herokuapp.com/";
axios.defaults.withCredentials = true;

export default axios;
