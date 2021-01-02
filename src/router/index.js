import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import About from "../views/About.vue";
import JobSubmit from "../components/JobSubmit";
import JobOffer from "../components/JobOffer";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Offers from "../views/Offers";
import Candidates from "../components/Candidates";
import Profile from "@/views/Profile";
import Quizz from "@/views/Quizz";
import Chat from "../views/Chat.vue";
import ForgetPassword from "../components/reset_password.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
    component: ForgetPassword
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    props: true
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    props: true
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat
  },
  {
    path: "/jobsubmit",
    name: "JobSubmit",
    component: JobSubmit
  },
  {
    path: "/joboffer",
    name: "JobOffer",
    component: JobOffer
  },
  {
    path: "/offers",
    name: "Offers",
    component: Offers
  },
  {
    path: "/candidates",
    name: "Candidates",
    component: Candidates
  },
  {
    path: "/quizz",
    name: "Quizz",
    component: Quizz
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
