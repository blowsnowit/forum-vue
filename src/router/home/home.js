
export default [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/home/HomeLayout'),
    children:[
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home'),
      },
      {
        path: '/search/:searchWord',
        name: 'search',
        component: () => import('@/views/home/Search'),
      },
      {
        path: '/user/:userId',
        name: 'user',
        component: () => import('@/views/home/UserInfo'),
      },
      {
        path: '/article/:articleId',
        name: 'article',
        component: () => import('@/views/home/Article'),
      },
      {
        path: '/topic/:name',
        name: 'topic',
        component: () => import('@/views/home/Topic'),
      },
      {
        path: '/tag/:name',
        name: 'tag',
        component: () => import('@/views/home/Tag'),
      },
      {
        path: '/topic',
        name: 'alltopic',
        component: () => import('@/views/home/AllTopic'),
      },
      {
        path: '/writeArticle',
        name: 'writeArticle',
        component: () => import('@/views/home/WriteArticle'),
        meta:{
          auth: true
        }
      },
      {
        path: '/writeArticle/:articleId',
        name: 'writeArticle',
        component: () => import('@/views/home/WriteArticle'),
        meta:{
          auth: true
        }
      }
    ]
  },
]
