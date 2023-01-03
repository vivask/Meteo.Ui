export const controllerRoutes = [
  {
    path: '/esp32/settings',
    component: () => import('@/controller/pages/PageEsp32Setting.vue'),
    meta: {
      requiresAuth: true,
      spinner: false,
    },
  },
  {
    path: '/esp32/alarm',
    component: () => import('@/controller/pages/PageEsp32Alarm.vue'),
    meta: {
      requiresAuth: true,
      spinner: false,
    },
  },
  {
    path: '/esp32/journal',
    component: () => import('@/controller/pages/PageEsp32Logging.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
