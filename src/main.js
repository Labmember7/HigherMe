import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import { BootstrapVue } from 'bootstrap-vue'
import CircularCountDownTimer from "vue-circular-count-down-timer";
Vue.use(CircularCountDownTimer);

// Install BootstrapVue
Vue.use(BootstrapVue)
require("@/store/modules/subscriber.js");
axios.defaults.baseURL = "http://vast-caverns-97827.herokuapp.com/api"; //"http://vast-caverns-97827.herokuapp.com/public/api";
Vue.config.productionTip = false;

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount("#app");
});