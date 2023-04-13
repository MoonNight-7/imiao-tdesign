import {GET, POST} from "@/utils/my-request";


const prefix = import.meta.env.VITE_CUST

const custApi = {
  adminAddNew(admin){
    return POST(`${prefix}/admin-info/add-new`,admin,{headers: {Authorization: localStorage.getItem('jwt')}})
  },
  getPermissionList() {
    return GET(`${prefix}/permission/get-list`, {headers: {Authorization: localStorage.getItem('jwt')}})
  },
  getAdminList({ pageNum, sizeNum }) {
    const params = {
      pageNum,
      sizeNum,
    };
    return GET(`${prefix}/admin-info/list-admins`, { params });
  }

}

export default custApi
