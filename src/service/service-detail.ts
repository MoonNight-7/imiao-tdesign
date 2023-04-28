interface DashboardPanel {
  title: string;
  number: string | number;
  leftType?: string;
  upTrend?: string;
  downTrend?: string;
}

export const PANE_LIST_DATA: Array<DashboardPanel> = [
  {
    title: '总申请数（次）',
    number: '1126',
    upTrend: '10%',
  },
  {
    title: '猫厂数量（个）',
    number: '13',
    downTrend: '13%',
  },
  {
    title: '出租猫咪品类（类）',
    number: '4',
    upTrend: '10%',
  },
  {
    title: '申请人数量（人）',
    number: 90,
    downTrend: '44%',
    leftType: 'icon-file-paste',
  },
  {
    title: '申请完成率（%）',
    number: 80.5,
    upTrend: '70%',
  },
  {
    title: '到货及时率（%）',
    number: 78,
    upTrend: '16%',
  },
];
export const PRODUCT_LIST = [
  {
    description: '猫咪营养师认证是一项专门针对猫咪营养与健康领域的专业认证。通过该认证的专业人士将具备丰富的猫咪营养学知识，了解猫咪的生理需求、饮食搭配、疾病预防与管理等方面的专业知识。',
    index: 1,
    isSetup: true,
    name: '猫咪营养师认证',
    type: 4,
  },
  {
    description: '恶猫管理认证是一套针对恶猫公司员工的管理系统，旨在提高工作效率和数据安全性。通过这一认证系统，员工可以获得相应权限，从而访问和操作公司内部资源。',
    index: 1,
    isSetup: true,
    name: '恶猫管理认证',
    type: 4,
  },
];
