import HTTP from "./config";
export async function fetchGroup() {
  return await HTTP.get("group")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
export async function joinGroup(gid, uid) {
  // console.log(gid, uid);
  await HTTP.post("/group/join", {
    STD_GroupID: gid,
    STD_ID: uid,
  }).catch(() => {
    console.error("Can't join group");
  });
}
export function updateGroup(val) {
  HTTP.post("/student/update_" + val.type, val).catch(() => {
    console.error("Can't update group");
  });
}
