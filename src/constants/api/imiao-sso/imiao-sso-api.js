import {GET, POST, PUT, DELETE} from "@/utils/my-request"

const prefix = import.meta.env.VITE_SSO

const ssoApi = {
  /**
   * @description: 登录接口
   * @author 邢展旗
   * @date 2023年04月11日 22:04:22
   */
  login(user) {
    return POST(`${prefix  }/admin/sso/login`, user)
  },
  /**
   * @description: 登出接口
   * @author 邢展旗
   * @date 2023年04月12日 00:04:02
   */
  logout() {
    return POST(`${prefix  }/admin/sso/logout`)
  },
  /**
   * @description: 用户详情获取
   * @author 邢展旗
   * @date 2023年04月11日 22:04:46
   */
  userDetail() {
    console.log('开始执行获取用户信息方法..........')
    // return GET(prefix + '/user/info/sso/')
    return GET(`${prefix  }/user/info/sso/`, { headers: { Authorization: localStorage.getItem('jwt') } })
  },

}
export default ssoApi;
