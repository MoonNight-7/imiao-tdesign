import {GET, POST} from "@/utils/my-request";

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
  getSpeciesList() {
    return GET(`${prefix}/cat-species/list`)
  }
}
export default catApi;
