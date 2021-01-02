import axios from "axios";
export default {
  namespaced: true,
  state: {
    profile: null
  },
  getters: {
    myProfile(state) {
      return state.user && state.token;
    }
  },
  mutations: {
    UPDATE_PROFILE(state, data) {
      state.profile = data;
    }
  },
  actions: {
    async update({ dispatch }, data, id) {
      let response = await axios.post(
        "/profile/updateemployerprofile/" + id,
        data
      );
      dispatch("attempt", response.data.access_token);
    }
    //to be continued
  }
};
