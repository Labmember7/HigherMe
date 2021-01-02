import axios from "axios";
export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  getters: {
    authenticated(state) {
      return state.user && state.token;
    },
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    }
  },
  actions: {
    async login({ dispatch }, credentials) {
      let response = await axios.post("/auth/login", credentials);
      dispatch("attempt", response.data.access_token);
    },
    async attempt({ commit, state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        return;
      }
      try {
        let response = await axios.post("/auth/me");
        commit("SET_USER", response.data.user);
      } catch (e) {
        console.log(e);
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },
    logout({ commit }) {
      return axios.post("auth/logout").then(() => {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      });
    }
  }
};
