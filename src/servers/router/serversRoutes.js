export const serversRoutes = [
  {
    path: '/servers/main',
    component: () => import('@/servers/pages/PageServerMain.vue'),
    meta: {
      requiresAuth: true,
      spinner: false,
    },
  },
  {
    path: '/servers/backup',
    component: () => import('@/servers/pages/PageServerBackup.vue'),
    meta: {
      requiresAuth: true,
      spinner: false,
    },
  },
];
