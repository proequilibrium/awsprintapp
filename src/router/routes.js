const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('pages/Welcome.vue'),
        meta: {
          requiresAuth: false
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
    path: '/todo',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'todo',
        path: '',
        component: () => import('pages/Todo.vue'),
        meta: {
          requiresAuth: true
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
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/fileupload',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'fileup',
        path: '',
        component: () => import('pages/FileUpload.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/imgedit',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'CropPage',
        path: '',
        component: () => import('pages/CropPage.vue'),
        meta: {
          requiresAuth: true
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
