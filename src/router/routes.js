const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/PageHome.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/PageLogin.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/sign',
        name: 'sign',
        component: () => import('@/pages/PageSign.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/proxy/servers',
        component: () => import('@/pages/PageProxy.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/proxy/zones',
        component: () => import('@/pages/PageZones.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];

export default routes;
