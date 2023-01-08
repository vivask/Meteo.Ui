export const databaseRoutes = [
  {
    path: '/database/tables',
    component: () => import('../pages/PageTables.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/database/sync',
    component: () => import('../pages/PageTableSync.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
