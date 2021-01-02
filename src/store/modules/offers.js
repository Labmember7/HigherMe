import axios from "axios";
const state = {
  offers: [],
  postes: []
};
const getters = {
  AllOffers: state => state.offers,
  AllPostes: state => state.postes
};
const actions = {
  async FetchOffers({ commit }) {
    const response = await axios.get("joboffer/getoffers");
    commit("SetOffers", response.data.joboffers.data);
  },
  async AddOffer({ commit }, offer) {
    console.log(offer);
    await axios.post("joboffer/createoffer", offer);
    commit("NewOffer", offer);
  },
  async DeleteOffer({ commit }, id) {
    await axios.delete(`joboffer/deleteoffer/${id}`).then(() => {
      commit("DeleteOffer", id);
    });
  },
  async UpdateOffer({ commit }, offer) {
    await axios.post(`joboffer/updateoffer/${offer.id}`, offer);
    commit("UpdateOffer", offer);
  },
  async AddCandidate({ commit }, candidate) {
    commit("AddCandidate", candidate);
  },
  async GetOffer({ commit }, id) {
    const response = await axios.get(`joboffer/getoffer/${id}`);
    commit("GetPostes", response.joboffer);
  },
  async DeletePost({ commit }, id) {
    await axios.delete(`posts/deletepost/${id}`).then(() => {
      commit("DeletePost", id);
    });
  }
};
const mutations = {
  GetPostes(state, joboffer) {
    state.postes = joboffer.postes;
  },
  SetOffers(state, offers) {
    state.offers = offers;
    console.log("offers in store", state.offers);
  },
  NewOffer(state, offer) {
    state.offers.unshift(offer);
  },
  DeleteOffer(state, id) {
    state.offers = state.offers.filter(offer => offer.id !== id);
    console.log("DELETED");
  },
  UpdateOffer(state, offer) {
    for (var i in state.offers) {
      if (state.offers[i].id === offer.id) {
        state.offers[i] = offer;
      }
    }
    console.log(offer.id, "UPDATED");
  },
  AddCandidate(state, poste) {
    for (var i in state.offers) {
      if (state.offers[i].id === poste.joboffer_id) {
        if (state.offers[i].postes.length != 0)
          state.offers[i].postes.unshift(poste);
        else state.offers[i].postes.push(poste);
        state.postes = state.offers[i].postes;
        console.log("Candidate Added");
      }
    }
  },
  DeletePost(state, id) {
    state.postes = state.postes.filter(offer => offer.id !== id);
    console.log("DELETED");
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
