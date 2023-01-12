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
  {
    path: '/mics6814/:parameter',
    component: () => import('../pages/PageMics6814.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
  {
    path: '/radsens/:parameter',
    component: () => import('../pages/PageRadsens.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
  {
    path: '/ze08ch2o/:parameter',
    component: () => import('../pages/PageZe08.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
  {
    path: '/ds18b20/:parameter',
    component: () => import('../pages/PageDs18b20.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
];
