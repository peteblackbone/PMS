import Axios from "axios";
const HTTP = Axios.create({
  baseURL: "http://26.50.177.239:3000/api/v1"
});
// const HTTP = Axios.create({
//   baseURL: "http://192.168.92.132:3300",
// });
export default HTTP;
