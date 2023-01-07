export const proxyRoutes = [
  {
    path: '/proxy/servers',
    component: () => import('@/proxy/pages/PageProxy.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/proxy/zones',
    component: () => import('@/proxy/pages/PageZones.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/proxy/manualvpn',
    component: () => import('@/proxy/pages/PageManualVpn.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/proxy/autovpn',
    component: () => import('@/proxy/pages/PageAutoVpn.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
      relations: ['/proxy/ignorevpn'],
    },
  },
  {
    path: '/proxy/ignorevpn',
    component: () => import('@/proxy/pages/PageIgnoreVpn.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
      relations: ['/proxy/autovpn'],
    },
  },
];