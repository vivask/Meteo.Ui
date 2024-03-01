import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useLayoutStore } from '../stores/useLayoutStore.js';
import { useLoaderStore } from '../stores/useLoaderStore';
import { layoutsRoutes } from '../../layouts/router/layoutsRoutes.js';
import { authRoutes } from '../../auth/router/authRoutes';
import { homeRoutes } from '../../home/router/homeRoutes';
import { proxyRoutes } from '../../proxy/router/proxyRoutes';
import { controllerRoutes } from '../../controller/router/controllerRoutes.js';
import { scheduleRoutes } from '../../schedule/router/scheduleRoutes.js';
import { secureRoutes } from '../../secure/router/secureRoutes.js';
import { serversRoutes } from '../../servers/router/serversRoutes.js';
import { radiusRoutes } from '../../radius/router/radiusRoutes.js';
import { databaseRoutes } from '../../database/router/databaseRoutes.js';
import { chartsRoutes } from '../../charts/router/chartsRoutes.js';
import { communalRoutes } from '../../communal/router/communalRoutes.js';

const createHistory = import.meta.env.SERVER
  ? createMemoryHistory(import.meta.env.BASE_URL)
  : import.meta.env.VITE_ROUTER_MODE === 'history'
  ? createWebHistory(import.meta.env.BASE_URL)
  : createWebHashHistory(import.meta.env.BASE_URL);

export const router = createRouter({
  history: createHistory,
  routes: [],
});

const layoutsChildren = [
  homeRoutes,
  authRoutes,
  controllerRoutes,
  proxyRoutes,
  scheduleRoutes,
  secureRoutes,
  serversRoutes,
  radiusRoutes,
  databaseRoutes,
  chartsRoutes,
  communalRoutes,
];

for (const children of layoutsChildren) {
  for (const route of children) {
    layoutsRoutes[0].children.push(route);
  }
}

const modulesRoutes = [layoutsRoutes];

for (const routes of modulesRoutes) {
  for (const route of routes) {
    router.addRoute(route);
  }
}

router.beforeEach(async (to, from, next) => {
  const spinner = to.matched.some((record) => record.meta.spinner);
  useLoaderStore().useSpinner(spinner);

  // redirect to login page if not logged in and trying to access a restricted page
  const authRequired = to.matched.some((record) => record.meta.requiresAuth);

  if (authRequired && !useAuthStore().loggedIn) {
    next({ name: 'login', query: { next: to.fullPath } });
  } else {
    next();
  }
});

router.afterEach((to) => {
  const prefix = import.meta.env.VITE_ROUTER_MODE === 'hash' ? '#' : '';
  useLayoutStore().setItems(prefix + to.path);
});
