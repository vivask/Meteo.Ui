export const databaseRoutes = [
  {
    path: '/database/tables',
    component: () => import('@/database/pages/PageTables.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/database/sync',
    component: () => import('@/database/pages/PageTableSync.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
