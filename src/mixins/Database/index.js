import HTTP from "./config";

async function fetch_group() {
  return await HTTP.get("student/topic").then((res) => {
    return res.data;
  });
}
function join(id) {
  HTTP.post("student/topic/join", {
    STD_GroupID: id,
    STD_ID: 1,
  });
}
function propose_new_project({ name, advisors }) {
  console.log(name, advisors);
}
async function fetch_ce(type) {
  return await HTTP.get(type).then((res) => {
    return res.data;
  });
}
function update(val) {
  HTTP.post("/student/update_" + val.type, val);
}

export default {
  fetch_group,
  join,
  propose_new_project,
  fetch_ce,
  update,
};
