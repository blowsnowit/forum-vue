
export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminLayout'),
    children:[
      {
        path: '',
        name: 'admin',
        component: () => import('@/views/admin/Dashboard'),
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/admin/table/UserList'),
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/admin/table/ArticleList'),
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@/views/admin/table/CommentList'),
      },
      {
        path: 'topic',
        name: 'topic',
        component: () => import('@/views/admin/table/TopicList'),
      },
      {
        path: 'tag',
        name: 'tag',
        component: () => import('@/views/admin/table/TagList'),
      },
      {
        path: 'set',
        name: 'set',
        component: () => import('@/views/admin/AdminSet'),
      },
    ]
  },
]
