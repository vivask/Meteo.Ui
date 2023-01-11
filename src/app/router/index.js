import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useLayoutStore } from '../stores/useLayoutStore.js';
import { useLoaderStore } from '../stores/useLoaderStore';
import { layoutsRoutes } from 'src/layouts/router/layoutsRoutes.js';
import { authRoutes } from 'src/auth/router/authRoutes.js';
import { homeRoutes } from 'src/home/router/homeRoutes.js';
import { controllerRoutes } from 'src/controller/router/controllerRoutes.js';
import { proxyRoutes } from 'src/proxy/router/proxyRoutes.js';
import { scheduleRoutes } from 'src/schedule/router/scheduleRoutes.js';
import { secureRoutes } from 'src/secure/router/secureRoutes.js';
import { serversRoutes } from 'src/servers/router/serversRoutes.js';
import { radiusRoutes } from 'src/radius/router/radiusRoutes.js';
import { databaseRoutes } from 'src/database/router/databaseRoutes.js';
import { chartsRoutes } from 'src/charts/router/chartsRoutes.js';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const authStore = useAuthStore();
  const loaderStore = useLoaderStore();
  const layoutStore = useLayoutStore();

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: [],

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  const layoutsChildren = [
    authRoutes,
    homeRoutes,
    controllerRoutes,
    proxyRoutes,
    scheduleRoutes,
    secureRoutes,
    serversRoutes,
    radiusRoutes,
    databaseRoutes,
    chartsRoutes,
  ];

  for (const children of layoutsChildren) {
    for (const route of children) {
      layoutsRoutes[0].children.push(route);
    }
  }

  const modulesRoutes = [layoutsRoutes];

  for (const routes of modulesRoutes) {
    for (const route of routes) {
      Router.addRoute(route);
    }
  }

  Router.beforeEach(async (to, from, next) => {
    const spinner = to.matched.some((record) => record.meta.spinner);

    loaderStore.useSpinner(spinner);

    // redirect to login page if not logged in and trying to access a restricted page
    const authRequired = to.matched.some((record) => record.meta.requiresAuth);

    if (authRequired && !authStore.loggedIn) {
      next({ name: 'login', query: { next: to.fullPath } });
    } else {
      next();
    }
  });

  Router.afterEach((to) => {
    const prefix = process.env.VUE_ROUTER_MODE === 'hash' ? '#' : '';
    layoutStore.setItems(prefix + to.path);
  });

  return Router;
});
