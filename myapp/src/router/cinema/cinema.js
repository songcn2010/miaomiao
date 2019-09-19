export default {
  path: '/cinema',
  name: 'cinema',
  component: () => import('@/views/cinema/cinema'),
  children: [
    {
      path: 'clist',
      component: () => import('@/components/clist/clist')
    },
    {
      path: '/cinema',
      redirect: '/cinema/clist'
    }
  ]
}