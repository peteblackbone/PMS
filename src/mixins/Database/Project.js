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
export async function form(gID) {
  return await HTTP.post("/form", { Form_GroupID: gID }).then(res => {
    console.log(res.data);
    return res.data;
  });
}
export async function latestEachForm(gID) {
  return await HTTP.get(`/form/group/${gID}/latest`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't get latest 'form CE' from each type");
    });
}
export async function formCE(gID, fID) {
  return await HTTP.post("/form", { Form_GroupID: gID, Form_TypeID: fID })
    .then(res => {
      if (res.data) {
        return res.data;
      }
    })
    .catch(() => {
      console.error("Can't get 'form CE'");
    });
}
export async function getFormPrerequisite() {
  return await HTTP.get("/formprerequisite").then(res => {
    return res.data;
  });
}
export async function form_ce(gID, fID) {
  return await HTTP.get("/form/group/" + gID + "/type/" + fID).then(res => {
    console.log(res);
    return res.data;
  });
}
export async function form_comment(fID) {
  return await HTTP.post("/formcomment", { Comment_FormID: fID }).then(res => {
    return res.data;
  });
}
export async function new_formcomment(fID, tID, text) {
  HTTP.post("/formcomment/create", {
    Comment_FormID: fID,
    Comment_TeacherID: tID,
    Comment_Text: text,
    Comment_Time: new Date()
  });
}
export async function upload_form(fID, file, onUploadProgress) {
  let formData = new FormData();

  formData.append("file", file);

  return await HTTP.post(`/upload/fileCE0${fID}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress
  });
}
