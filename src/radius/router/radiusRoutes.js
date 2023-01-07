export const radiusRoutes = [
  {
    path: '/radius/auth',
    component: () => import('@/radius/pages/PageAuth.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/radius/accounting',
    component: () => import('@/radius/pages/PageAccounting.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/radius/verified',
    component: () => import('@/radius/pages/PageVerified.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
