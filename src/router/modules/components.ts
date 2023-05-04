import {ViewModuleIcon, Edit1Icon, LayersIcon} from 'tdesign-icons-vue';
import Layout from '@/layouts/index.vue';

export default [
  // {
  //   path: '/list',
  //   name: 'list',
  //   component: Layout,
  //   redirect: '/list/base',
  //   meta: {title: '列表页', icon: ViewModuleIcon},
  //   children: [
  //     {
  //       path: 'base',
  //       name: 'ListBase',
  //       component: () => import('@/pages/list/base/index.vue'),
  //       meta: {title: '基础列表页'},
  //     },
  //     {
  //       path: 'card',
  //       name: 'ListCard',
  //       component: () => import('@/pages/list/card/index.vue'),
  //       meta: {title: '卡片列表页'},
  //     },
  //     {
  //       path: 'filter',
  //       name: 'ListFilter',
  //       component: () => import('@/pages/list/filter/index.vue'),
  //       meta: {title: '筛选列表页'},
  //     },
  //     {
  //       path: 'tree',
  //       name: 'ListTree',
  //       component: () => import('@/pages/list/tree/index.vue'),
  //       meta: {title: '树状筛选列表页'},
  //     },
  //   ],
  // },
  // {
  //   path: '/form',
  //   name: 'form',
  //   component: Layout,
  //   redirect: '/form/base',
  //   meta: {title: '表单页', icon: Edit1Icon},
  //   children: [
  //     {
  //       path: 'base',
  //       name: 'FormBase',
  //       component: () => import('@/pages/form/base/index.vue'),
  //       meta: {title: '基础表单页'},
  //     },
  //     {
  //       path: 'step',
  //       name: 'FormStep',
  //       component: () => import('@/pages/form/step/index.vue'),
  //       meta: {title: '分步表单页'},
  //     },
  //   ],
  // },
  // {
  //   path: '/detail',
  //   name: 'detail',
  //   component: Layout,
  //   redirect: '/detail/base',
  //   meta: {title: '详情页', icon: LayersIcon},
  //   children: [
  //     {
  //       path: 'base',
  //       name: 'DetailBase',
  //       component: () => import('@/pages/detail/base/index.vue'),
  //       meta: {title: '基础详情页'},
  //     },
  //     {
  //       path: 'advanced',
  //       name: 'DetailAdvanced',
  //       component: () => import('@/pages/detail/advanced/index.vue'),
  //       meta: {title: '多卡片详情页'},
  //     },
  //     {
  //       path: 'deploy',
  //       name: 'DetailDeploy',
  //       component: () => import('@/pages/detail/deploy/index.vue'),
  //       meta: {title: '数据详情页'},
  //     },
  //     {
  //       path: 'secondary',
  //       name: 'DetailSecondary',
  //       component: () => import('@/pages/detail/secondary/index.vue'),
  //       meta: {title: '二级详情页'},
  //     },
  //   ],
  // },
  // {
  //   path: '/frame',
  //   name: 'frame',
  //   component: Layout,
  //   redirect: '/frame/doc',
  //   meta: {title: '外部页面', icon: 'internet'},
  //   children: [
  //     {
  //       path: 'doc',
  //       name: 'Doc',
  //       component: () => import('@/pages/frame/doc/index.vue'),
  //       meta: {title: '个人主页'},
  //     },
  //     // {
  //     //   path: 'TDesign',
  //     //   name: 'TDesign',
  //     //   component: () => import('@/pages/frame/tdesign/index.vue'),
  //     //   meta: {title: 'TDesign 文档（内嵌）'},
  //     // },
  //     // {
  //     //   path: 'https://tdesign.tencent.com/vue-next/getting-started',
  //     //   name: 'TDesign2',
  //     //   meta: {title: 'TDesign 文档（外链）'},
  //     // },
  //   ],
  // },

  {
    path: '/cat',
    name: 'cat',
    meta: {title: '找喵🐱', icon: 'cat'},
    component: Layout,
    redirect: '/cat/find-cat',
    children: [
      {
        path: 'find',
        name: 'CatFind',
        component: () => import('@/pages/cat/find/index.vue'),
        meta: {title: '超级筛选'},
      },
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: {title: '订单中心', icon: 'bulletpoint'},
    component: Layout,
    redirect: '/order/my-order',
    children: [
      {
        path: 'my-order',
        name: 'OrderMyOrder',
        component: () => import('@/pages/order/my-order/index.vue'),
        meta: {title: '我的订单'},
      },
    ]
  },
];
