import {DELETE, GET, POST, PUT} from "@/utils/my-request";


const prefix = import.meta.env.VITE_CUST

const custApi = {
  /**
   * @description: 新增管理员
   * @author 邢展旗
   * @date 2023年04月13日 17:04:56
   */
  adminAddNew(admin) {
    return POST(`${prefix}/admin-info/add-new`, admin)
  },
  /**
   * @description: 获取权限列表
   * @author 邢展旗
   * @date 2023年04月13日 17:04:10
   */
  getPermissionList() {
    return GET(`${prefix}/permission/get-list`)
  },
  /**
   * @description: 获取权限详情(根据id)
   * @param permissionId 权限id
   * @author 邢展旗
   * @date 2023年04月22日 00:04:09
   */
  getPermissionDetail(permissionId) {
    return GET(`${prefix}/permission/get-detail`, {params: {permissionId}})
  },
  /**
   * @description: 获取管理员信息(根据id)
   * @author 邢展旗
   * @date 2023年04月15日 10:04:20
   */
  getAdminById(id) {
    return GET(`${prefix}/admin-info/get-by-id`, {params: {id}})
  },
  /**
   * @description: 禁用管理员账号(根据id) * @param adminId 管理员id
   * @author 邢展旗
   * @date 2023年04月15日 10:04:27
   */
  disableAdmin(adminId) {
    return PUT(`${prefix}/admin-info/set-disable`, {adminId});
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
  /**
   * @description: 获取管理员列表(带搜索条件)
   * @author 邢展旗
   * @date 2023年04月15日 10:04:46
   */
  queryAdmins({nickname, pageNum, sizeNum}) {
    const params = {
      nickname,
      pageNum,
      sizeNum,
    };
    return GET(`${prefix}/admin-info/query-admins`, {params})
  },
  /**
   * @description: 新增用户(注册用户) * @param user 用户信息对象
   * @author 邢展旗
   * @date 2023年04月27日 11:04:54
   */
  userAddNew(user) {
    return POST(`${prefix}/user-info/register`, user)
  },
  /**
   * @description: 删除用户(根据id)
   * @author 邢展旗
   * @date 2023年04月27日 11:04:59
   */
  deleteUser(userId) {
    return DELETE(`${prefix}/user-info/delete-by-id`, {params: {userId}})
  },
  /**
   * @description: 启用用户(根据id)
   * @author 邢展旗
   * @date 2023年04月27日 11:04:24
   */
  enableUser(userId) {
    return PUT(`${prefix}/user-info/set-enable`, {userId})
  },
  /**
   * @description: 禁用用户(根据id)
   * @author 邢展旗
   * @date 2023年04月27日 11:04:29
   */
  disableUser(userId) {
    return PUT(`${prefix}/user-info/set-disable`, {userId})
  },
  /**
   * @description: 获取用户列表(带搜索条件)
   * @author 邢展旗
   * @date 2023年04月27日 11:04:34
   */
  queryUsers({pageNum, sizeNum, userId, nickname, enable}) {
    const params = {
      pageNum,
      sizeNum,
      userId,
      nickname,
      enable
    };
    return GET(`${prefix}/user-info/query-users`, {params})
  }

}

export default custApi
