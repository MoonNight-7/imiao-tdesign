import {MessagePlugin} from "tdesign-vue";
import {TOKEN_NAME} from '@/config/global';
import ssoApi from "@/constants/api/imiao-sso/imiao-sso-api";

const InitUserInfo = {
  roles: [],
  userData: {}
};

// 定义的state初始值
const state = {
  token: localStorage.getItem(TOKEN_NAME), // 默认token不走权限
  userInfo: InitUserInfo,
};

const mutations = {
  setToken(state, token) {
    localStorage.setItem(TOKEN_NAME, token);
    state.token = token;
  },
  removeToken(state) {
    localStorage.removeItem(TOKEN_NAME);
    state.token = '';
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setUserData(state, userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
    state.userInfo.userData = userData
  },
  removeUserData(state) {
    localStorage.clear();
    state.userInfo = {}
    console.log('清除用户信息成功！')
  }
};

const getters = {
  token: (state) => state.token,
  roles: (state) => state.userInfo?.roles,
  userData: (state) => state.userInfo?.userData,
};

const actions = {
  async login({commit}, userInfo) {

    const spliceString = (res) => {
      const {tokenHeader} = res.data;
      const {tokenValue} = res.data;
      return tokenHeader + tokenValue;
    }

    const res = await ssoApi.login(userInfo)


    if (res.state === 200) {
      console.log('用户名密码正确！.............')
      await commit('setToken', spliceString(res));
      console.log("setToken已经执行完毕..........")
      const userDetail = await ssoApi.userDetail();
      console.log('从userDetail接口获取到数据..........')
      console.log(userDetail)
      commit('setUserData', userDetail.data);
      MessagePlugin.success(`欢迎您，${userDetail.data.nickname}!`)
    } else {
      throw res;
    }
  },
  async getUserInfo({commit, state}) {
    const mockRemoteUserInfo = async () => ({
      name: 'td_main',
      roles: ['ALL_ROUTERS'],
      userData: state.userInfo.userData,
    });

    const res = await mockRemoteUserInfo(state.token);

    commit('setUserInfo', res);
  },
  async logout({commit}) {
    commit('removeToken');
    commit('removeUserData');
    // commit('setUserInfo', InitUserInfo);
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
