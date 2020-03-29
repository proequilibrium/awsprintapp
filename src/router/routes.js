const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'todo',
        component: () => import('pages/Todo.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'auth',
        component: () => import('pages/Auth.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'profile',
        path: '',
        component: () => import('pages/Profile.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/calc',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'calc',
        path: '',
        component: () => import('pages/Calculator.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  }
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
export default routes
