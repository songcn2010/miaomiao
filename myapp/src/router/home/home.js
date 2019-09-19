export default {
  path: '/home',
  name: 'home',
  component: () => import('@/views/home/home'),
  children: [
    {
      path: 'nowplaying',
      component: () => import('@/components/nowplaying/nowplaying')
    },
    {
      path: 'coming',
      component: () => import('@/components/coming/coming')
    },
    {
      path: 'cities',
      component: () => import('@/components/cities/cities')
    },
    {
      path: 'search',
      component: () => import('@/components/search/search')
    },
    {
      path: 'detail/n/:movieId',
      components: {
        default: () => import('@/components/nowplaying/nowplaying'),
        detail: () => import('@/views/home/detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: 'detail/c/:movieId',
      components: {
        default: () => import('@/components/coming/coming'),
        detail: () => import('@/views/home/detail')
      }
    },
    {
      path: 'detail/s/:movieId',
      components: {
        default: () => import('@/components/search/search'),
        detail: () => import('@/views/home/detail')
      }
    },
    

    {
      path: '/home',
      redirect: '/home/nowplaying'
    }
  ]
}
