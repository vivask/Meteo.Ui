import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    me: {},
    token: "",
    isAuthenticated: false,
  }),

  getters: {
    is_authenticated: (state) => state.isAuthenticated,
    get_token: (state) => state.token,
  },

  actions: {
    async doSignup(payload) {
      await axios.post("/api/v1/signup", payload);
    },
    async doLogin(payload) {
      await axios.post("/api/v1/login", payload).then((response) => {
        const token = response.data;
        console.log("Token: ", token.token);
        this.setToken(token);
        axios.defaults.headers.common.Authorization = "Bearer " + token.token;
        this.getMe();
      });
    },
    async getMe() {
      await axios
        .get("/api/v1/admin/user/")
        .then((response) => {
          this.me = response.data;
        })
        .catch(() => {
          this.removeToken();
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
    async signOut() {
      await axios.get("/api/v1/admin/logout").then(() => {
        axios.defaults.headers.common.Authorization = "";
        this.removeToken();
      });
    },
    async refreshToken() {
      await axios.get("/api/v1/admin/refresh_token/").then((response) => {
        if (response.data) {
          this.setToken(response.data);
          axios.defaults.headers.common.Authorization =
            "Bearer " + JSON.parse(token).token;
        } else {
          this.removeToken();
        }
      });
    },
    async init() {
      const token = localStorage.getItem("token");
      if (token) {
        const restored = JSON.parse(token);
        axios.defaults.headers.common.Authorization =
          "Bearer " + restored.token;
        this.setToken(restored);
        this.getMe();
      } else {
        this.removeToken();
      }
    },
    async GetUser() {
      return await axios
        .get("/api/v1/admin/user/")
        .then((response) => {
          return response.data.data.username == this.me.data.username;
        })
        .catch(() => {
          this.removeToken();
          return false;
        });
    },
  },
});
