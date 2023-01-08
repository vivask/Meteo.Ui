export const proxyRoutes = [
  {
    path: '/proxy/servers',
    component: () => import('../pages/PageProxy.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/proxy/zones',
    component: () => import('../pages/PageZones.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/proxy/manualvpn',
    component: () => import('../pages/PageManualVpn.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/proxy/autovpn',
    component: () => import('../pages/PageAutoVpn.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
      relations: ['/proxy/ignorevpn'],
    },
  },
  {
    path: '/proxy/ignorevpn',
    component: () => import('../pages/PageIgnoreVpn.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
      relations: ['/proxy/autovpn'],
    },
  },
];
