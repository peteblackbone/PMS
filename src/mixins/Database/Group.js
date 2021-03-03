import HTTP from "./config";

//#region outbound

export async function GetAll() {
  return await HTTP.get("groupproject")
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
export async function GetSelf(gID) {
  return await HTTP.get(`/groupproject/${gID}`)
    .then(res => {
      return res.data[0];
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}

//#endregion outbound

//#region inbound

export async function Join(gid, uid) {
  await HTTP.post("/group/join", {
    STD_GroupID: gid,
    STD_ID: uid
  }).catch(() => {
    console.error("Can't join group");
  });
}
export function Update(val) {
  HTTP.post("/student/update_" + val.type, val).catch(() => {
    console.error("Can't update group");
  });
}

//#endregion inbound
