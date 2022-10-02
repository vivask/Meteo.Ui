const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requireAuth: false,
    },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/HomePage.vue"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "/login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "/sign",
        name: "sign",
        component: () => import("pages/SignPage.vue"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "/esp32/settings",
        component: () => import("pages/Esp32SetPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/esp32/alarm",
        component: () => import("pages/Esp32AlarmPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/esp32/journal",
        component: () => import("pages/Esp32LogPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/proxy/servers",
        component: () => import("pages/ProxyPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/proxy/zones",
        component: () => import("pages/ZonesPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/proxy/autovpn",
        component: () => import("pages/AutoVpnPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/proxy/manualvpn",
        component: () => import("pages/ManualVpnPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/proxy/ignorevpn",
        component: () => import("pages/IgnoreVpnPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/schedule/timetable",
        component: () => import("pages/TimetablePage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/schedule/tasks",
        component: () => import("pages/TasksPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/schedule/cron",
        component: () => import("pages/CronPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/secure/sshkeys",
        component: () => import("pages/SshKeysPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/secure/sshhosts",
        component: () => import("pages/SshHostsPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/secure/gitkeys",
        component: () => import("pages/GitKeysPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/secure/githosts",
        component: () => import("pages/GitHostsPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/database/tables",
        component: () => import("pages/TablesPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/database/sync",
        component: () => import("pages/SyncPage.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/servers/xu4",
        component: () => import("pages/Xu4Page.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/servers/n2",
        component: () => import("pages/N2Page.vue"),
        meta: {
          requireAuth: true,
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
