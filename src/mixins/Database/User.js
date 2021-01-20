import HTTP from "./config";
export async function GetAllTeacher() {
  return HTTP.get("/userteacher").then(res => {
    return res.data;
  });
}
export async function UserStudent(id) {
  return HTTP.get(`/userstudent/${id}`).then(res => {
    return res.data;
  });
}
export async function GetAllStudentByGroupID(gID) {
  return await HTTP.post("/userstudent", { Student_GroupID: gID })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
// export async function GetAllTeacherByGroupID(gID) {
//   return await HTTP.post("/userteacher", { Student_GroupID: gID })
//     .then(res => {
//       console.log(res.data);
//       return res.data;
//     })
//     .catch(() => {
//       console.error("Can't fetch group.");
//     });
// }
