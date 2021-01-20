import Axios from "axios";
const HTTP = Axios.create({
  baseURL: "http://26.50.177.239:3000/api/v1",
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
});
export default HTTP;
