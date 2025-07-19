import axios from "axios";
export default axios.create({
  //  baseURL: "https://dsdhj-api.onrender.com/",
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});
