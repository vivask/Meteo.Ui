export const homeRoutes = [
    {
    path: '',
    name: 'home',
    component: () => import('@/controller/pages/PageHome.vue'),
    meta: {
      requiresAuth: false,
    },
    }
]
