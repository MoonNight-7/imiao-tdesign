export interface msgDataItem {
  id: string;
  content: string;
  type: string;
  status: boolean;
  collected: boolean;
  date: string;
  quality: string;
}
// 定义的state初始值
const state: { msgData: Array<msgDataItem> } = {
  msgData: [
    {
      id: '123',
      content: '用户艾克的租赁请求 已通过审核！',
      type: '租赁动态',
      status: true,
      collected: false,
      date: '2023-04-01 08:00',
      quality: 'high',
    },
    {
      id: '124',
      content: '员工王大明申请了【请假】，周期为【1年】',
      type: '员工动态',
      status: true,
      collected: false,
      date: '2023-04-01 08:00',
      quality: 'low',
    },
    {
      id: '125',
      content: '2023-05-07 08:00的【毕业答辩】即将开始，请提前10分钟前往 科技楼 进行签到！',
      type: '会议通知',
      status: true,
      collected: false,
      date: '2023-05-07 08:00',
      quality: 'middle',
    },
    {
      id: '126',
      content: '员工坤坤申请了【休假】，周期为【两年半】',
      type: '员工动态',
      status: true,
      collected: false,
      date: '2023-04-01 08:00',
      quality: 'low',
    },
    {
      id: '127',
      content: '员工孙悟空申请了【请假】，周期为【100年】',
      type: '员工动态',
      status: true,
      collected: false,
      date: '2023-04-01 08:00',
      quality: 'low',
    },
    {
      id: '128',
      content: '员工王志宇申请了【复工】，到岗日期为【2023-05-08】',
      type: '员工动态',
      status: true,
      collected: false,
      date: '2023-04-01 08:00',
      quality: 'low',
    },
  ],
};

const mutations = {
  setMsgData(state, data) {
    // eslint-disable-next-line no-param-reassign
    state.msgData = data;
  },
};

const getters = {
  unreadMsg: (state) => state.msgData.filter((item) => item.status),
  readMsg: (state) => state.msgData.filter((item) => !item.status),
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
