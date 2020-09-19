import Axios from "axios";
const HTTP = Axios.create({
  baseURL: "http://localhost:3300/",
});
export default HTTP
