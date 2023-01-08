export const secureRoutes = [
  {
    path: '/secure/sshkeys',
    component: () => import('../pages/PageSshKeys.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/secure/sshhosts',
    component: () => import('../pages/PageSshHosts.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/secure/gitusers',
    component: () => import('../pages/PageGitUsers.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
