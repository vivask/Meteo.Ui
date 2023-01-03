export const proxyRoutes = [
  {
    path: '/proxy/servers',
    component: () => import('@/proxy/pages/PageProxy.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/proxy/zones',
    component: () => import('@/proxy/pages/PageZones.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/proxy/manualvpn',
    component: () => import('@/proxy/pages/PageManualVpn.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/proxy/autovpn',
    component: () => import('@/proxy/pages/PageAutoVpn.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/proxy/ignorevpn',
    component: () => import('@/proxy/pages/PageIgnoreVpn.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
