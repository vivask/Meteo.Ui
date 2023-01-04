import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../../shared/stores/useAuthStore.js';
import { useLayoutStore } from '../../shared/stores/useLayoutStore.js';
import { useLoaderStore } from '../../shared/stores/useLoaderStore';
import { layoutsRoutes } from '../../layouts/router/layoutsRoutes.js';
import { authRoutes } from '../../auth/router/authRoutes';
import { homeRoutes } from '../../home/router/homeRoutes';
import { proxyRoutes } from '../../proxy/router/proxyRoutes';
import { controllerRoutes } from '../../controller/router/controllerRoutes.js';
import { scheduleRoutes } from '../../schedule/router/scheduleRoutes.js';
import { secureRoutes } from '../../secure/router/secureRoutes.js';

const createHistory = import.meta.env.SERVER
  ? createMemoryHistory(import.meta.env.BASE_URL)
  : import.meta.env.VITE_ROUTER_MODE === 'history'
  ? createWebHistory(import.meta.env.BASE_URL)
  : createWebHashHistory(import.meta.env.BASE_URL);

export const router = createRouter({
  history: createHistory,
  routes: [],
});

const layoutsChildren = [homeRoutes, authRoutes, controllerRoutes, proxyRoutes, scheduleRoutes, secureRoutes];

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

router.beforeEach(async (to) => {
  const spinner = to.matched.some((record) => record.meta.spinner);
  const loader = useLoaderStore();
  loader.useSpinner(spinner);

  // redirect to login page if not logged in and trying to access a restricted page
  const authRequired = to.matched.some((record) => record.meta.requiresAuth);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
});

router.afterEach((to) => {
  const layout = useLayoutStore();
  const prefix = import.meta.env.VITE_ROUTER_MODE === 'hash' ? '#' : '';
  layout.setItems(prefix + to.path);
});
