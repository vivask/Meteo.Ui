const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/HomePage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/sign",
        name: "sign",
        component: () => import("pages/SignPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/peripheral/bme280/temperature",
        component: () => import("pages/Bme280TemperaturePage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/esp32/settings",
        component: () => import("pages/Esp32SetPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/esp32/alarm",
        component: () => import("pages/Esp32AlarmPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/esp32/journal",
        component: () => import("pages/Esp32LogPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/proxy/servers",
        component: () => import("pages/ProxyPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/proxy/zones",
        component: () => import("pages/ZonesPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/proxy/autovpn",
        component: () => import("pages/AutoVpnPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/proxy/manualvpn",
        component: () => import("pages/ManualVpnPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/proxy/ignorevpn",
        component: () => import("pages/IgnoreVpnPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/schedule/timetable",
        component: () => import("pages/TimetablePage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/schedule/tasks",
        component: () => import("pages/TasksPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/schedule/cron",
        component: () => import("pages/CronPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/secure/sshkeys",
        component: () => import("pages/SshKeysPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/secure/sshhosts",
        component: () => import("pages/SshHostsPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/secure/gitusers",
        component: () => import("pages/GitUsersPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/database/tables",
        component: () => import("pages/TablesPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/database/sync",
        component: () => import("pages/SyncPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/servers/main",
        component: () => import("pages/ServerMainPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/servers/backup",
        component: () => import("pages/ServerBackupPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/radius/auth",
        component: () => import("pages/AuthRadius.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/radius/account",
        component: () => import("pages/AcctRadius.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
