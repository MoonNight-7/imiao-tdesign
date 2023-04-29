import { DashboardIcon } from 'tdesign-icons-vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/recommend',
    name: 'dashboard',
    meta: {
      title: '推荐',
      icon: DashboardIcon,
    },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/recommend/index.vue'),
        meta: { title: '官方推荐' },
      },
      {
        path: 'detail',
        name: 'DashboardDetail',
        component: () => import('@/pages/dashboard/detail/index.vue'),
        meta: { title: '个人推荐' },
      },
    ],
  },
];
