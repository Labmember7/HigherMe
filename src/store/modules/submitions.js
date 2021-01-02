import axios from "axios";
const state = {
  candidates: []
};
const getters = {};
const actions = {
  async SubmitCandidate({ commit }, payload) {
    console.log(payload);
    await axios.post("posts/createpost", payload);
    console.log("SUBMITTED");
    commit("LoadCandidates", payload);
  }
};
const mutations = {
  LoadCandidates(state, payload) {
    this.state.candidates = payload;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
