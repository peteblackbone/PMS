import Axios from "axios";
const HTTP = Axios.create({
  baseURL: `http://${process.env.VUE_APP_API_HOST}/`
});
export default HTTP;
