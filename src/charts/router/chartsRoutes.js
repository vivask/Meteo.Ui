export const chartsRoutes = [
  {
    path: '/bme280/:parameter',
    component: () => import('@/charts/pages/PageBme280.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
  {
    path: '/mics6814/:parameter',
    component: () => import('@/charts/pages/PageMics6814.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
  {
    path: '/radsens/:parameter',
    component: () => import('@/charts/pages/PageRadsens.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
  {
    path: '/ze08ch2o/:parameter',
    component: () => import('@/charts/pages/PageZe08.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
  {
    path: '/ds18b20/:parameter',
    component: () => import('@/charts/pages/PageDs18b20.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
];
