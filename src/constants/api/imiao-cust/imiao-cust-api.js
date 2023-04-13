import {GET, POST} from "@/utils/my-request";


const prefix = import.meta.env.VITE_CUST

const custApi = {
  /**
   * @description: 新增管理员
   * @author 邢展旗
   * @date 2023年04月13日 17:04:56
   */
  adminAddNew(admin) {
    return POST(`${prefix}/admin-info/add-new`, admin, {headers: {Authorization: localStorage.getItem('jwt')}})
  },
  /**
   * @description: 获取权限列表
   * @author 邢展旗
   * @date 2023年04月13日 17:04:10
   */
  getPermissionList() {
    return GET(`${prefix}/permission/get-list`, {headers: {Authorization: localStorage.getItem('jwt')}})
  },
  /**
   * @description: 获取管理员列表
   * @author 邢展旗
   * @date 2023年04月13日 17:04:20
   */
  getAdminList({pageNum, sizeNum}) {
    const params = {
      pageNum,
      sizeNum,
    };
    return GET(`${prefix}/admin-info/list-admins`, {params});
  },
  queryAdmins({nickname, pageNum, sizeNum}) {
    const params = {
      nickname,
      pageNum,
      sizeNum,
    };
    return GET(`${prefix}/admin-info/query-admins`, {params})
  }

}

export default custApi
