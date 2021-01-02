import Vue from "vue";
import Vuex from "vuex";
import submitions from "@/store/modules/submitions";
import offers from "@/store/modules/offers";
import auth from "@/store/modules/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    submitions,
    offers,
    auth
  }
});
