export const serversRoutes = [
  {
    path: '/servers/main',
    component: () => import('@/servers/pages/PageServerMain.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/servers/backup',
    component: () => import('@/servers/pages/PageServerBackup.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
