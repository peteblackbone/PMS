import HTTP from "./config";

export async function proposeNewProject(val) {
  await HTTP.post("/group/add", {
    Group_ID: val.Group_ID,
    Group_Name: val.Group_Name,
    Group_Detail: val.Group_Detail,
    Group_Type: val.Group_Type,
    Group_Year: val.Group_Year,
    Group_Term: val.Group_Term,
    Group_Member: val.Group_Member,
    Group_Status: val.Group_Status,
    Group_RequestStatus: val.Group_RequestStatus
  }).catch(() => {
    console.error("Can't add new group");
  });
}
export async function fetchCE(type) {
  return await HTTP.get(type)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch CE");
    });
}
