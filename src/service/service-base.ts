import { TdBaseTableProps } from 'tdesign-vue';

interface DashboardPanel {
  title: string;
  number: string | number;
  leftType: string;
  upTrend?: string;
  downTrend?: string;
}

interface TendItem {
  growUp?: number;
  productName: string;
  count: number;
  date: string;
}

export const PANE_LIST: Array<DashboardPanel> = [
  {
    title: '总收入',
    number: '¥ 28,425.00',
    upTrend: '20.5%',
    leftType: 'echarts-line',
  },
  {
    title: '总退款',
    number: '¥ 768.00',
    downTrend: '20.5%',
    leftType: 'echarts-bar',
  },
  {
    title: '活跃用户（个）',
    number: '1126',
    downTrend: '20.5%',
    leftType: 'icon-usergroup',
  },
  {
    title: '订单（个）',
    number: 527,
    downTrend: '20.5%',
    leftType: 'icon-file-paste',
  },
];

export const SALE_TEND_LIST: Array<TendItem> = [
  {
    growUp: 1,
    productName: '布偶猫',
    count: 7059,
    date: '2021-09-01',
  },
  {
    growUp: -1,
    productName: '困困猫',
    count: 6437,
    date: '2021-09-01',
  },
  {
    growUp: 4,
    productName: '英国短毛猫',
    count: 4221,
    date: '2021-09-01',
  },
  {
    growUp: 3,
    productName: '斯芬克斯',
    count: 3317,
    date: '2021-09-01',
  },
  {
    growUp: -3,
    productName: '土耳其安哥拉猫',
    count: 3015,
    date: '2021-09-01',
  },
  {
    growUp: -3,
    productName: '美国短毛猫',
    count: 2015,
    date: '2021-09-12',
  },
];

export const BUY_TEND_LIST: Array<TendItem> = [
  {
    growUp: 1,
    productName: '困困猫',
    count: 3015,
    date: '2021-09-01',
  },
  {
    growUp: -1,
    productName: '英国短毛猫',
    count: 2015,
    date: '2021-09-01',
  },
  {
    growUp: 6,
    productName: '美国短毛猫',
    count: 1815,
    date: '2021-09-11',
  },
  {
    growUp: -3,
    productName: '土耳其安哥拉猫',
    count: 1015,
    date: '2021-09-21',
  },
  {
    growUp: -4,
    productName: '布偶猫',
    count: 445,
    date: '2021-09-19',
  },
  {
    growUp: -3,
    productName: '斯芬克斯',
    count: 2015,
    date: '2021-09-12',
  },
];

export const SALE_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: '排名',
    width: 80,
    fixed: 'left',
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    title: '客户名称',
    minWidth: 200,
  },
  {
    align: 'center',
    colKey: 'growUp',
    width: 100,
    title: '较上周',
  },
  {
    align: 'center',
    colKey: 'count',
    title: '订单量',
    width: 100,
  },
  // {
  //   align: 'center',
  //   colKey: 'date',
  //   width: 140,
  //   title: '合同签订日期',
  // },
  {
    align: 'center',
    colKey: 'operation',
    title: '操作',
    width: 80,
    fixed: 'right',
  },
];

export const BUY_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: '排名',
    width: 80,
    fixed: 'left',
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    title: '供应商名称',
    minWidth: 200,
  },
  {
    align: 'center',
    colKey: 'growUp',
    width: 100,
    title: '较上周',
  },
  {
    align: 'center',
    colKey: 'count',
    title: '订单量',
    width: 100,
  },
  // {
  //   align: 'center',
  //   colKey: 'date',
  //   width: 140,
  //   title: '合同签订日期',
  // },
  {
    align: 'center',
    colKey: 'operation',
    title: '操作',
    width: 80,
    fixed: 'right',
  },
];
