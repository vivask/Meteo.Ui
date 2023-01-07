export const layoutsRoutes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../MainLayout.vue'),
    meta: {
      requiresAuth: false,
    },
    children: [],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../ErrorNotFound.vue'),
  },
];
