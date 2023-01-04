export const scheduleRoutes = [
  {
    path: '/schedule/timetable',
    component: () => import('@/schedule/pages/PageJobs.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/schedule/tasks',
    component: () => import('@/schedule/pages/PageTasks.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
  {
    path: '/schedule/cron',
    component: () => import('@/schedule/pages/PageCron.vue'),
    meta: {
      requiresAuth: true,
      spinner: true,
    },
  },
];
