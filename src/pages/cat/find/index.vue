<template>
  <div>
    <t-form
      ref="form"
      :data="query"
      :label-width="80"
      colon
      @reset="onReset"
      @submit="onSubmit"
      :style="{ marginBottom: '8px' }"
    >
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[16, 24]">
            <t-col :flex="1">
              <t-form-item label="猫咪颜色" name="color" help="支持模糊查询👍">
                <t-input
                  v-model="query.color"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入猫咪颜色"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
              <t-form-item label="最小年龄" name="minCatAge">
                <t-input
                  v-model="query.minCatAge"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入猫咪最小年龄（岁）"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
              <t-form-item label="猫咪品种" name="speciesId">
                <t-select
                  v-model="query.speciesId"
                  :options="speciesList"
                  placeholder="请选择猫咪品种"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" type="submit" :style="{ marginLeft: '8px' }"> 查询</t-button>
          <t-button type="reset" variant="base" theme="default"> 重置</t-button>
        </t-col>
      </t-row>
    </t-form>
    <template v-if="!dataLoading">
      <div class="list-card-items">
        <t-row :gutter="[16, 16]">
          <t-col
            :lg="4"
            :xs="6"
            :xl="3"
            v-for="product in productList"
            :key="product.index"
          >
            <cat-card :cat-info="product"/>
          </t-col>
        </t-row>
      </div>
    </template>
    <div v-else-if="dataLoading" class="list-card-loading">
      <t-loading text="加载中..."></t-loading>
    </div>
  </div>
</template>

<script>

import CatCard from "@/components/cat-card/index.vue";
import catApi from "@/constants/api/imiao-cat/imiao-cat-api";

const INITIAL_QUERY = {
  pageNum: 1,
  pageSize: 20,
  enable: 1,
  available: 1,
}
export default {
  name: "index",
  components: {CatCard},
  data() {
    return {
      dataLoading: false,
      productList: [],
      speciesList:[],
      query: {...INITIAL_QUERY}
    }
  },
  mounted() {
    this.dataLoading = true
    this.queryCatList()
    this.initCatSpeciesList()
  },
  methods: {
    async initCatSpeciesList() {
      const res = await catApi.getSpeciesList()
      this.speciesList = res.data.map(species=>({
        value: species.speciesId,
        label: species.speciesName
      }))
    },
    queryCatList() {
      catApi.getCatInfoList(this.query).then(res => {
        this.productList = res.data.list
        this.dataLoading = false
      })
    },
    onReset(data) {
      console.log(data)
    },
    onSubmit() {
      this.queryCatList()
    }
  },
}
</script>

<style scoped>

</style>
