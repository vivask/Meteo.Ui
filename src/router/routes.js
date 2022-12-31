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
        path: '/esp32/settings',
        component: () => import('@/pages/PageEsp32Setting.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/esp32/alarm',
        component: () => import('@/pages/PageEsp32Alarm.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/esp32/journal',
        component: () => import('@/pages/PageEsp32Logging.vue'),
        meta: {
          requiresAuth: true,
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
      {
        path: '/proxy/manualvpn',
        component: () => import('@/pages/PageManualVpn.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/proxy/autovpn',
        component: () => import('@/pages/PageAutoVpn.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/proxy/ignorevpn',
        component: () => import('@/pages/PageIgnoreVpn.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/schedule/timetable',
        component: () => import('@/pages/PageJobs.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/schedule/tasks',
        component: () => import('@/pages/PageTasks.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/schedule/cron',
        component: () => import('@/pages/PageCron.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/secure/sshkeys',
        component: () => import('@/pages/PageSshKeys.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/secure/sshhosts',
        component: () => import('@/pages/PageSshHosts.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/secure/gitusers',
        component: () => import('@/pages/PageGitUsers.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/servers/main',
        component: () => import('@/pages/PageServerMain.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/servers/backup',
        component: () => import('@/pages/PageServerBackup.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/radius/auth',
        component: () => import('@/pages/PageAuth.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/radius/accounting',
        component: () => import('@/pages/PageAccounting.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/radius/verified',
        component: () => import('@/pages/PageVerified.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/database/tables',
        component: () => import('@/pages/PageTables.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/database/sync',
        component: () => import('@/pages/PageTableSync.vue'),
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
