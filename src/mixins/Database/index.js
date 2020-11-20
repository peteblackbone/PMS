import HTTP from "./config";

async function fetchGroup() {
  return await HTTP.get("group")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
async function joinGroup(gid, uid) {
  // console.log(gid, uid);
  await HTTP.post("/group/join", {
    STD_GroupID: gid,
    STD_ID: uid,
  }).catch(() => {
    console.error("Can't join group");
  });
}
async function proposeNewProject(val) {
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
  }).catch(() => {
    console.error("Can't add new group");
  });
}
async function fetchCE(type) {
  return await HTTP.get(type)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch CE");
    });
}
function updateGroup(val) {
  HTTP.post("/student/update_" + val.type, val).catch(() => {
    console.error("Can't update group");
  });
}

export default {
  fetchGroup,
  joinGroup,
  proposeNewProject,
  fetchCE,
  updateGroup,
};
