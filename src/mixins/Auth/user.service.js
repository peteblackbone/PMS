import HTTP from "./config";

export const userService = {
  login,
  logout
};

function login(username, password) {
  return HTTP.post(
    "/login",
    JSON.stringify({
      username: username,
      password: password
    }),
    { headers: { "Content-Type": "application/json" } }
  ).then(async res => {
    if (res.data.token) {
      sessionStorage.setItem("token", res.data.token);
      return await HTTP.get(
        `/api/v1/userstudent/${
          JSON.parse(atob(res.data.token.split(".")[1])).Student_ID
        }`,
        {
          headers: { Authorization: `Bearer ${res.data.token}` }
        }
      );
    }
    return false;
  });
}

function logout() {
  // remove user from local storage to log user out
  // localStorage.clear();
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  location.reload();
}
