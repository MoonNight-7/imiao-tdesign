import { DashboardIcon } from 'tdesign-icons-vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/recommend',
    component: Layout,
    redirect: '/recommend/system',
    name: 'dashboard',
    meta: {
      title: '推荐',
      icon: DashboardIcon,
    },
    children: [
      {
        path: 'system',
        name: 'RecommendSystem',
        component: () => import('@/pages/recommend/system/index.vue'),
        meta: { title: '官方推荐' },
      },
      {
        path: 'personal',
        name: 'RecommendPersonal',
        component: () => import('@/pages/recommend/personal/index.vue'),
        meta: { title: '个人推荐' },
      },
    ],
  },
];
