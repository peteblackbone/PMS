// import config from 'config';
// import { authHeader } from '../_helpers';
import Axios from "axios";

export const userService = {
  login,
  logout,
};

function login(username, password) {
  const data = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };
  return Axios.post(
    "http://localhost:3000/auth/login",
    JSON.stringify({
      username: username,
      password: password,
    }),
    { headers: { "Content-Type": "application/json" } }
  )
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user.data.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(user, "Asd");
        localStorage.setItem("user", JSON.stringify(user.data));
      }

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  location.reload(true)
}

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

