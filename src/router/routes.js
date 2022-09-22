
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/esp32/settings', component: () => import('pages/Esp32SetPage.vue') },
      { path: '/esp32/alarm', component: () => import('pages/Esp32AlarmPage.vue') },
      { path: '/esp32/journal', component: () => import('pages/Esp32LogPage.vue') },
      { path: '/proxy/servers', component: () => import('pages/ProxyPage.vue') },
      { path: '/proxy/zones', component: () => import('pages/ZonesPage.vue') },
      { path: '/proxy/autovpn', component: () => import('pages/AutoVpnPage.vue') },
      { path: '/proxy/manualvpn', component: () => import('pages/ManualVpnPage.vue') },
      { path: '/proxy/ignorevpn', component: () => import('pages/IgnoreVpnPage.vue') },
      { path: '/schedule/timetable', component: () => import('pages/TimetablePage.vue') },
      { path: '/schedule/tasks', component: () => import('pages/TasksPage.vue') },
      { path: '/schedule/cron', component: () => import('pages/CronPage.vue') },
      { path: '/secure/sshkeys', component: () => import('pages/SshKeysPage.vue') },
      { path: '/secure/sshhosts', component: () => import('pages/SshHostsPage.vue') },
      { path: '/secure/gitkeys', component: () => import('pages/GitKeysPage.vue') },
      { path: '/secure/githosts', component: () => import('pages/GitHostsPage.vue') },
      { path: '/database/tables', component: () => import('pages/TablesPage.vue') },
      { path: '/database/sync', component: () => import('pages/SyncPage.vue') },
      { path: '/servers/xu4', component: () => import('pages/Xu4Page.vue') },
      { path: '/servers/n2', component: () => import('pages/N2Page.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
