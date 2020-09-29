import HTTP from "./config";

async function fetch_group() {
  return await HTTP.get("group").then((res) => {
    return res.data;
  });
}
async function join(gid, uid) {
  console.log(gid, uid);
  await HTTP.post("/group/join", {
    STD_GroupID: gid,
    STD_ID: uid,
  });
}
async function propose_new_project(val) {
  await HTTP.post("/group/add", {
    Group_ID: val.Group_ID,
    Group_Name: val.Group_Name,
    Group_Detail: val.Group_Detail,
    Group_Type: val.Group_Type,
    Group_Year: val.Group_Year,
    Group_Term: val.Group_Term,
    Group_Member: val.Group_Member,
    Group_Status: val.Group_Status,
    Group_RequestStatus: val.Group_RequestStatus,
  })
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
