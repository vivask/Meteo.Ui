export const chartsRoutes = [
  {
    path: '/bme280/:parameter',
    component: () => import('../pages/PageBme280.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
];
