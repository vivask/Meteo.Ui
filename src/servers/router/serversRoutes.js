export const serversRoutes = [
  {
    path: '/servers/main',
    component: () => import('../pages/PageServerMain.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/servers/backup',
    component: () => import('../pages/PageServerBackup.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
