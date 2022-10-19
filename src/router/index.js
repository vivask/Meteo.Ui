import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useLayoutStore } from "src/stores/layout";
import { useAuthStore } from "src/stores/auth";

//import JWT from "jwt-client";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const auth = useAuthStore();
  auth.init();

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
    scrollBehavior: () => ({ y: 0 }),
  });

  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (!requiresAuth) {
      useLayoutStore().set_current_path(to.path);
      next();
    } else {
      auth
        .GetUser()
        .then((currentUser) => {
          if (requiresAuth && !currentUser) {
            next({ name: "login", query: { next: to.fullPath } });
            useLayoutStore().set_current_path(to.path);
          } else {
            useLayoutStore().set_current_path(to.path);
            next();
          }
        })
        .catch(() => {
          next({ name: "login", query: { next: to.fullPath } });
          useLayoutStore().set_current_path(to.path);
        });
    }
    /*if (routes[0].name === "layout") {
      console.log("Routes: ", routes[0]);
      const layout = routes[0].component();
      layout.SetMenuState();
    }*/
  });

  return Router;
});
