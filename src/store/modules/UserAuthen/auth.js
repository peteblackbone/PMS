import router from "../../../router";
import { userService } from "./Service";
export const auth = {
  namespaced: true,
  state: {
    // username: "",
    // name: "",
    // email: "",
    // token: "",
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
  },
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit("loginRequest", { username });
      // console.log(username,password)
      userService.login(username, password).then(
        (user) => {
          commit("loginSuccess", user);
          // router.push("/");
          router.push("/student")
        },
        (error) => {
          console.log('error')
          commit("loginFailure", error);
        //   dispatch("alert/error", error, { root: true });
        }
      );
    },
    logout({ commit }) {
      userService.logout();
      commit("logout");
    },
  },
};
