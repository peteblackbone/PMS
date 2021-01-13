import HTTP from "./config";
export async function GetAllTeacher() {
  return HTTP.get("/userteacher").then(res => {
    return res.data.data;
  });
}
