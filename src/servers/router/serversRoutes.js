export const serversRoutes = [
  {
    path: '/servers/main',
    component: () => import('../pages/PageServerMain.vue'),
    meta: {
      requiresAuth: true,
      spinner: false,
    },
  },
  {
    path: '/servers/backup',
    component: () => import('../pages/PageServerBackup.vue'),
    meta: {
      requiresAuth: true,
      spinner: false,
    },
  },
];
