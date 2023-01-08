export const scheduleRoutes = [
  {
    path: '/schedule/timetable',
    component: () => import('../pages/PageJobs.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/schedule/tasks',
    component: () => import('../pages/PageTasks.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/schedule/cron',
    component: () => import('../pages/PageCron.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
