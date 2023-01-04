export const homeRoutes = [
  {
    path: '',
    name: 'home',
    component: () => import('@/home/pages/PageHome.vue'),
    meta: {
      requiresAuth: false,
      spinner: false,
    },
  },
];
