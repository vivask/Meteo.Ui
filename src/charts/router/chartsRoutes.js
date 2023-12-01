export const chartsRoutes = [
  {
    path: '/gy39v3/:parameter',
    component: () => import('@/charts/pages/PageGy39v3.vue'),
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
    path: '/aht25/:parameter',
    component: () => import('@/charts/pages/PageAht25.vue'),
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
    path: '/sc16/:parameter',
    component: () => import('@/charts/pages/PageSc16.vue'),
    meta: {
      requiresAuth: false,
      spinner: true,
    },
    props: true,
  },
];
