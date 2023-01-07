export const homeRoutes = [
  {
    path: '',
    name: 'home',
    //component: () => import('../pages/IndexPage.vue'),
    component: () => import('../pages/PageHome.vue'),
    meta: {
      requiresAuth: false,
      spinner: false,
    },
  },
];
