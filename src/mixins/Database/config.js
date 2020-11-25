import Axios from "axios";
const HTTP = Axios.create({
  baseURL: "http://localhost:3300"
});
// const HTTP = Axios.create({
//   baseURL: "http://192.168.92.132:3300",
// });
export default HTTP;
