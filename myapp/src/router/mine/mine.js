export default {
  path: '/mine',
  component: () => import('@/views/mine/mine'),
  children: [
    {
      path: 'login',
      component: () => import('@/components/login/login')
    },
    {
      path: 'center',
      component: () => import('@/components/center/center')
    },
    {
      path: 'register',
      component: () => import('@/components/register/register')
    },
    {
      path: 'rename',
      component: () => import('@/components/rename/rename')
    },
    {
      path: 'repass',
      component: () => import('@/components/repass/repass')
    },
    {
      path: 'findpass',
      component: () => import('@/components/findpass/findpass')
    },
    {
      path: '/mine',
      redirect: '/mine/center'
    }
  ]
}