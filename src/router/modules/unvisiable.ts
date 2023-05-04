import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/cat-info',
    component: Layout,
    redirect: '/home/recommend',
    name: 'CatInfo',
    meta: {
      title: '推荐',
    },
    children: [
      {
        path: 'top-up',
        name: 'CatInfoTopUp',
        component: () => import('@/pages/recommend/system/index.vue'),
        meta: { title: '充值' },
      },
      {
        path: 'detail',
        name: 'CatInfoDetail',
        component: () => import('@/pages/cat/detail/index.vue'),
        meta: { title: '猫咪详情' },
      },
    ],
  },
];
