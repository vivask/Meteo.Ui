export const secureRoutes = [
  {
    path: '/secure/sshkeys',
    component: () => import('@/secure/pages/PageSshKeys.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/secure/sshhosts',
    component: () => import('@/secure/pages/PageSshHosts.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/secure/gitusers',
    component: () => import('@/secure/pages/PageGitUsers.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
