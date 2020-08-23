import { HTTP } from "./config";
const DB = {
  async fetch_group() {
    return await HTTP.get("student/topic").then((res) => {
      return res.data;
    });
  },
  join(id) {
    HTTP.post("student/topic/join", {
      STD_GroupID: id,
      STD_ID: 1,
    });
  },
  propose_new_project({ name, advisors }) {
    console.log(name, advisors);
  },
};
export default DB;
