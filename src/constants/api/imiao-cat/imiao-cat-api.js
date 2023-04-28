import {DELETE, GET, POST, PUT} from "@/utils/my-request";

const prefix = import.meta.env.VITE_CAT

const catApi = {
  /**
   * @description: 新增品种
   * @author 邢展旗
   * @date 2023年04月22日 00:04:15
   */
  addSpecies(species) {
    return POST(`${prefix}/cat-species/add-new`, species)
  },
  /**
   * @description: 获取品种列表
   * @author 邢展旗
   * @date 2023年04月22日 00:04:32
   */
  getSpeciesList(name) {
    return GET(`${prefix}/cat-species/get-by-name`, name)
  },
  /**
   * @description: 获取品种详情(根据id)
   * @author 邢展旗
   * @date 2023年04月26日 18:04:20
   */
  getOwnerList() {
    return GET(`${prefix}/ownerType/list`)
  },
  /**
   * @description: 上传图片
   * @author 邢展旗
   * @date 2023年04月25日 11:04:43
   */
  uploadPic(pic) {
    return POST(`${prefix}/upload/upload`, pic)
  },
  /**
   * @description: 删除图片
   * @author 邢展旗
   * @date 2023年04月25日 11:04:05
   */
  removePic(pic) {
    return POST(`${prefix}/upload/remove`, pic)
  },
  /**
   * @description: 新增猫咪信息
   * @author 邢展旗
   * @date 2023年04月28日 16:04:37
   */
  addCatInfo(catInfo) {
    return POST(`${prefix}/cat-info/add-new`, catInfo)
  },
  /**
   * @description: 删除猫咪信息
   * @author 邢展旗
   * @date 2023年04月28日 16:04:42
   */
  deleteCatInfo(catId) {
    return DELETE(`${prefix}/cat-info/delete/${catId}`)
  },
  /**
   * @description: 启用猫咪
   * @author 邢展旗
   * @date 2023年04月28日 16:04:56
   */
  setEnableCatInfo(catId) {
    return PUT(`${prefix}/cat-info/set-enable/${catId}`)
  },
  /**
   * @description: 禁用猫咪
   * @author 邢展旗
   * @date 2023年04月28日 16:04:10
   */
  setDisableCatInfo(catId) {
    return PUT(`${prefix}/cat-info/set-disable/${catId}`)
  },
  /**
   * @description: 上架猫咪信息
   * @author 邢展旗
   * @date 2023年04月28日 16:04:27
   */
  setAvailableCatInfo(catId) {
    return PUT(`${prefix}/cat-info/set-available/${catId}`)
  },
  /**
   * @description: 下架猫咪信息
   * @author 邢展旗
   * @date 2023年04月28日 16:04:33
   */
  setUnavailableCatInfo(catId) {
    return PUT(`${prefix}/cat-info/set-unavailable/${catId}`)
  },
  /**
   * @description: 获取猫咪信息列表(分页查询)
   * @author 邢展旗
   * @date 2023年04月28日 16:04:45
   */
  getCatInfoList({
    available,
    enable,
    color,
    ownerTypeId,
    maxCatAge,
    minCatAge,
    maxCatPrice,
    minCatPrice,
    speciesId,
    pageNum,
    pageSize,
  }) {
    const params = {
      available,
      enable,
      color,
      ownerTypeId,
      maxCatAge,
      minCatAge,
      maxCatPrice,
      minCatPrice,
      speciesId,
      pageNum,
      pageSize,
    };
    return GET(`${prefix}/cat-info/query-list`, {params})
  }
}
export default catApi;
