import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import { layoutsRoutes } from '../../layouts/router/layoutsRoutes.js';
import { homeRoutes } from '../../home/router/homeRoutes';
import { authRoutes } from '../../auth/router/authRoutes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
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

  const layoutsChildren = [homeRoutes, authRoutes];

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

  return Router;
});
