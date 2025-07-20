import axios from "axios";
export default axios.create({
  baseURL: "https://api.dsdhj.ng/",
  // baseURL: "http://localhost:5000/",
  withCredentials: true,
});
