export const radiusRoutes = [
  {
    path: '/radius/auth',
    component: () => import('../pages/PageAuth.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/radius/accounting',
    component: () => import('../pages/PageAccounting.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/radius/verified',
    component: () => import('../pages/PageVerified.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
