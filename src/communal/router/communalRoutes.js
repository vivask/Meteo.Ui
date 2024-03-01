export const communalRoutes = [
  {
    path: '/communal',
    name: 'communal',
    component: () => import('@/communal/pages/PageCommunal.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
