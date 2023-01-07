export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/PageLogin.vue'),
    meta: {
      requiresAuth: false,
      spinner: false,
    },
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../pages/PageSign.vue'),
    meta: {
      requiresAuth: false,
      spinner: false,
    },
  },
];
