export const layoutsRoutes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: false,
    },
    children: [],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/layouts/ErrorNotFound.vue'),
  },
];
