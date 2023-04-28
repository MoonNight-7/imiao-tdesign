<template>
  <t-form>
    <t-table
      rowKey="catId"
      :columns="columns"
      :data="data"
      :filter-value="filterValue"
      :bordered="false"
      :pagination="pagination"
      resizable
      hover
      table-layout="fixed"
      @filter-change="onFilterChange"
      @change="onChange"
      @page-change="rehandlePageChange"
      :loading="dataLoading"
      :headerAffixedTop="true"
    >
      <template #enable="{ row }">
        <t-tag v-if="row.enable === 0" theme="danger" variant="light">未上架</t-tag>
        <t-tag v-if="row.enable === 1" theme="warning" variant="light">已上架</t-tag>
      </template>

      <template #available="{ row }">
        <t-tag v-if="row.available === 0" theme="danger" variant="light">不可租</t-tag>
        <t-tag v-if="row.available === 1" theme="warning" variant="light">可租</t-tag>
      </template>

      <template #catPrice="{ row }">
        <p>￥{{ (Math.floor(row.catPrice * 100) / 100).toFixed(2) }}</p>
      </template>

      <template #catWeight="{ row }">
        <p>{{ row.catWeight }}.00kg</p>
      </template>

      <template #op="slotProps">
        <a class="t-button-link" @click="rehandleClickOp(slotProps)">详细信息</a>
        <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
      </template>
    </t-table>
    <t-dialog :visible.sync="dialogVisible" header="猫咪详细信息" :width="800" :destroy-on-close="true">
      <t-form :data="catDetailForm">
        <t-row class="row-gap" :gutter="[0, 24]">
          <t-col :span="6">
            <t-form-item label="出租状态">
              <t-switch v-model="catDetailForm.available" :customValue="[1,0]" :onChange="changeAvailable" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="上架状态">
              <t-switch v-model="catDetailForm.enable" :customValue="[1,0]" :onChange="changeEnable" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="猫咪编号">
              <t-input disabled v-model="catDetailForm.catId"/>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="猫咪品种">
              <t-input disabled v-model="catDetailForm.speciesName"/>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="年龄">
              <t-input disabled v-model="catDetailForm.catAge"/>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="价格(元/天)">
              <t-input disabled v-model="catDetailForm.catPrice"/>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="体重">
              <t-input disabled v-model="catDetailForm.catWeight"/>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="拥有者类型">
              <t-input disabled v-model="catDetailForm.ownerTypeName"/>
            </t-form-item>
          </t-col>
        </t-row>

        <div class="table-form-description">其它信息</div>


        <t-form-item label="颜色">
          <t-input disabled v-model="catDetailForm.color"/>
        </t-form-item>
        <t-form-item label="描述">
          <t-textarea disabled v-model="catDetailForm.catDescription"/>
        </t-form-item>
        <t-form-item label="照片">
          <t-image-viewer v-for="(img, index) in catDetailForm.catPictures" :key="img" :default-index="index" :images="catDetailForm.catPictures">
            <template #trigger="{ open }">
              <div class="tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base">
                <img alt="test" :src="img" class="tdesign-demo-image-viewer__ui-image--img" />
                <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open">
                  <span><browse-icon size="1.4em" /> 预览</span>
                </div>
              </div>
            </template>
          </t-image-viewer>
        </t-form-item>
        <t-form-item label="创建时间">
          <t-input disabled v-model="catDetailForm.gmtCreate"/>
        </t-form-item>
        <t-form-item label="修改时间">
          <t-input disabled v-model="catDetailForm.gmtModified"/>
        </t-form-item>
      </t-form>
    </t-dialog>


  </t-form>
</template>

<script>
import catApi from "@/constants/api/imiao-cat/imiao-cat-api";
import { BrowseIcon } from 'tdesign-icons-vue';

const prefix = import.meta.env.VITE_CAT

const INITIAL_QUERY = {
  pageNum: 1,
  pageSize: 20,
}
export default {
  name: "FilterTable",
  components: {
    BrowseIcon
  },
  data() {
    return {
      prefix,
      data: [],
      catSpeciesArr: [],
      filterValue: {},
      pagination: {
        defaultPageSize: 20,
        total: 100,
        defaultCurrent: 1,
      },
      query: {...INITIAL_QUERY},
      dataLoading: false,
      dialogVisible: false,
      catDetailForm: {},
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '猫咪编号',
          fixed: 'left',
          colKey: 'catId',
          align: 'left',
          width: 200,
          ellipsis: true,
        },
        {
          title: '上架状态',
          colKey: 'enable',
          align: 'left',
          width: 120,
          // 单选过滤配置
          filter: {
            type: 'single',
            list: [
              {label: '已上架', value: 1},
              {label: '未上架', value: 0},
            ],
          }
        },
        {
          title: '出租状态',
          colKey: 'available',
          align: 'left',
          width: 120,
          // 单选过滤配置
          filter: {
            type: 'single',
            list: [
              {label: '可租', value: 1},
              {label: '不可租', value: 0},
            ],
          }
        },
        {
          title: '猫咪种类',
          colKey: 'speciesName',
          align: 'left',
          width: 150,
          filter: {
            type: 'single',
            list: this.catSpeciesArr
          }
        },
        {
          title: '猫咪名称',
          width: 100,
          colKey: 'catName',
          align: 'left',
        },
        {
          title: '年龄',
          colKey: 'catAge',
          align: 'left',
        },
        {
          title: '价格(元/天)',
          colKey: 'catPrice',
          width: 120,
          align: 'left',
        },
        {
          title: '体重',
          colKey: 'catWeight',
          align: 'left',
          width: 120,
        },
        {
          title: '拥有者类型',
          width: 150,
          colKey: 'ownerTypeName',
          align: 'left',
        },
        {
          align: 'left',
          fixed: 'right',
          width: 200,
          colKey: 'op',
          title: '操作',
        },
      ]
    }
  },
  mounted() {
    this.dataLoading = true
    this.initCatInfoList()
    this.initCatSpecies()
  },
  methods: {
    initCatInfoList() {
      catApi.getCatInfoList(this.query).then(res => {
        this.data = res.data.list
        this.pagination.total = res.data.total
      })
    },
    initCatSpecies() {
      catApi.getSpeciesList().then(res => {
        this.catSpeciesArr = res.data.map(species => ({
          value: species.speciesId,
          label: species.speciesName
        }))
        this.dataLoading = false
      })
    },
    onFilterChange(filters) {
      console.log('filter-change', filters);
      const isFiltersEmpty = Object.keys(filters).length === 0;
      if (isFiltersEmpty) {
        this.query = {...INITIAL_QUERY};
        this.filterValue = {}
      } else {
        this.filterValue = {
          ...filters,
          speciesId: filters.speciesName || '',
        };
        this.query = {
          ...this.query,
          ...this.filterValue,
        };
      }

      // 重新获取过滤后的数据
      this.initCatInfoList();
    },
    onChange(info, context) {
      console.log('change', info, context, '筛选、分页、排序等功能发生变化均会触发');
    },
    rehandlePageChange(curr, pageInfo) {
      console.log('分页变化', curr, pageInfo);
      this.query.pageNum = curr.current;
      this.query.pageSize = curr.pageSize;
      this.initCatInfoList();
    },
    rehandleClickOp({text, row}) {
      console.log(text, row);
      this.catDetailForm = row;
      if (row.catPictures && typeof row.catPictures === 'string') {
        this.catDetailForm.catPictures = row.catPictures.split(',').map(picUrl => prefix + picUrl);
      }
      this.dialogVisible = true;
    },

    handleClickDelete(row) {
      const {userId} = row.row;
      this.deleteUserId = userId;
      this.deleteIdx = row.rowIndex;
      this.confirmVisible = true;
    },
    changeEnable(value){
      const {catId} = this.catDetailForm
      console.log(catId, value)
      if (value === 1){
        catApi.setEnableCatInfo(catId).then(res => {
          this.$message.success('上架成功')
        })
      }else if (value === 0){
        catApi.setDisableCatInfo(catId).then(res => {
          this.$message.success('下架成功')
        })
      }
      console.log(`上架状态发生改变${value}`)
    },
    changeAvailable(value){
      const {catId} = this.catDetailForm
      console.log(catId, value)
      if (value === 1){
        catApi.setAvailableCatInfo(catId).then(res => {
          this.$message.success('可租成功')
        })
      }else if (value === 0){
        catApi.setUnavailableCatInfo(catId).then(res => {
          this.$message.success('设置不可租成功')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table-form-description{
  font-size: 20px;
  line-height: 24px;
  color: var(--td-text-color-primary);
  margin: var(--td-comp-size-xxxl) 20px 32px;
}

.tdesign-demo-image-viewer__ui-image {
  width: 100%;
  height: 100%;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: var(--td-radius-small);
  overflow: hidden;
}

.tdesign-demo-image-viewer__ui-image--hover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--td-text-color-anti);
  line-height: 22px;
  transition: 0.2s;
}

.tdesign-demo-image-viewer__ui-image:hover .tdesign-demo-image-viewer__ui-image--hover {
  opacity: 1;
  cursor: pointer;
}

.tdesign-demo-image-viewer__ui-image--img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  position: absolute;
}

.tdesign-demo-image-viewer__ui-image--footer {
  padding: 0 16px;
  height: 56px;
  width: 100%;
  line-height: 56px;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  color: var(--td-text-color-anti);
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  box-sizing: border-box;
}

.tdesign-demo-image-viewer__ui-image--title {
  flex: 1;
}

.tdesign-demo-popup__reference {
  margin-left: 16px;
}

.tdesign-demo-image-viewer__ui-image--icons .tdesign-demo-icon {
  cursor: pointer;
}

.tdesign-demo-image-viewer__base {
  width: 160px;
  height: 160px;
  margin: 10px;
  border: 4px solid var(--td-bg-color-secondarycontainer);
  border-radius: var(--td-radius-medium);
}
</style>
