export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/auth/pages/PageLogin.vue'),
    meta: {
      requiresAuth: false,
      spinner: false,
    },
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('@/auth/pages/PageSign.vue'),
    meta: {
      requiresAuth: false,
      spinner: false,
    },
  },
];
