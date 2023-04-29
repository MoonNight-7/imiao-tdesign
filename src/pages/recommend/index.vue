<template>
  <div>
    <cat-banner/>
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
import CatBanner from "@/components/cat-banner/index.vue";
import catApi from "@/constants/api/imiao-cat/imiao-cat-api";

const prefix = import.meta.env.VITE_CAT

const INITIAL_QUERY = {
  pageNum: 1,
  pageSize: 12,
  available: 1,
  enable: 1,
}

export default {
  name: "index",
  components: {CatCard,CatBanner},
  data() {
    return {
      prefix,
      dataLoading: false,
      productList: [],
      query: {...INITIAL_QUERY}
    };
  },
  mounted() {
    this.dataLoading = true
    this.initCatList()
  },
  methods: {
    initCatList() {
      catApi.getCatInfoList(this.query).then(res => {
        this.productList = res.data.list
        this.dataLoading = false
      })
    },
  }
}
</script>

<style scoped lang="less">
.list-card-items{
  margin-top: 20px;
}
</style>
