import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    me: {},
    token: "",
    isAuthenticated: false,
  }),

  getters: {
    getToken() {
      return token;
    },
  },

  actions: {
    async doSignup(payload) {
      await axios.post("/api/v1/signup", payload);
    },
    async doLogin(payload) {
      await axios.post("/api/v1/login", payload).then((response) => {
        const token = response.data;
        this.setToken(token);
        axios.defaults.headers.common.Authorization = "JWT " + token.access;
      });
    },
    async getMe(token) {
      await axios.get("/api/v1/users/me/", token.access).then((response) => {
        this.me = response.data;
      });
    },
    setToken(token) {
      this.token = token;
      this.isAuthenticated = true;
      window.localStorage.setItem("token", JSON.stringify(token));
    },
    removeToken() {
      this.token = "";
      this.isAuthenticated = false;
      window.localStorage.setItem("token", "");
    },
    signOut() {
      axios.defaults.headers.common.Authorization = "";
      this.removeToken();
    },
    async init() {
      const token = localStorage.getItem("token");
      if (token) {
        this.setToken(token);
        axios.defaults.headers.common.Authorization =
          "JWT " + JSON.parse(token).access;
      } else {
        this.removeToken();
      }
    },
  },
});
