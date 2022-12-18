import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { useLayoutStore } from '@/stores/useLayoutStore.js';

const createHistory = import.meta.env.SERVER
  ? createMemoryHistory(import.meta.env.BASE_URL)
  : import.meta.env.VITE_ROUTER_MODE === 'history'
  ? createWebHistory(import.meta.env.BASE_URL)
  : createWebHashHistory(import.meta.env.BASE_URL);

export const router = createRouter({
  history: createHistory,
  routes: routes,
});

router.beforeEach(async (to) => {
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
