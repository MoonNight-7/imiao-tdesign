<template>
  <div class="list-card">
    <!-- 搜索区域 -->
    <div class="list-card-operation">
      <t-button @click="jumpRouter">新增店员</t-button>
      <t-input v-model="query.nickname" class="search-input" placeholder="请输入你需要搜索的员工" clearable @keyup.enter.native="queryMemberList">
        <template #suffix-icon>
          <search-icon v-if="query.nickname === ''" size="20px"/>
        </template>
        <template #suffix>

        </template>
      </t-input>
    </div>
    <!-- 卡片列表 -->
    <template v-if="pagination.total > 0 && !dataLoading">
      <div class="list-card-items">
        <t-row :gutter="[16, 16]">
          <t-col
            :lg="4"
            :xs="6"
            :xl="3"
            v-for="member in memberList.slice(0,pagination.sizeNum)"
            :key="member.index"
          >
            <member-card :member="member" @delete-item="handleDeleteItem" @manage-product="handleManageProduct"/>
          </t-col>
        </t-row>
      </div>
      <div class="list-card-pagination">
        <t-pagination
          v-model="pagination.pageNum"
          :total="pagination.total"
          :pageSizeOptions="[12, 24, 36]"
          :page-size.sync="pagination.sizeNum"
          @page-size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </template>
    <div v-else-if="dataLoading" class="list-card-loading">
      <t-loading text="加载中..."></t-loading>
    </div>
    <!-- 产品管理弹窗 -->
    <t-dialog header="员工状态管理" :visible.sync="formVisible" :width="680" :footer="false">
      <div slot="body">
        <!-- 表单内容 -->
        <t-form :data="formData" ref="form" :rules="rules" @submit="onSubmit" :labelWidth="100">
          <t-form-item label="员工状态" name="type">
            <t-select v-model="formData.type" clearable :style="{ width: '480px' }">
              <t-option v-for="(item, index) in options" :value="item.value" :label="item.label" :key="index">
                {{ item.label }}
              </t-option>
            </t-select>
          </t-form-item>
          <t-form-item v-if="formData.type == 2" label="请假原因" name="name">
            <t-input :style="{ width: '480px' }" v-model="formData.name" placeholder="请输入请假原因"></t-input>
          </t-form-item>
          <t-form-item label="账号状态" name="status">
            <t-radio-group v-model="formData.status">
              <t-radio value="0">停用</t-radio>
              <t-radio value="1">启用</t-radio>
            </t-radio-group>
          </t-form-item>

          <t-form-item label="备注" name="mark">
            <t-textarea :style="{ width: '480px' }" v-model="textareaValue" placeholder="请输入内容" name="description">
            </t-textarea>
          </t-form-item>
          <t-form-item style="float: right">
            <t-button variant="outline" @click="onClickCloseBtn">取消</t-button>
            <t-button theme="primary" type="submit">确定</t-button>
          </t-form-item>
        </t-form>
      </div>
    </t-dialog>
    <!-- 删除操作弹窗 -->
    <t-dialog
      header="确认开除所选员工？"
      :body="confirmBody"
      :visible.sync="confirmVisible"
      @confirm="onConfirmDelete"
      :onCancel="onCancel"
    >
    </t-dialog>
  </div>
</template>
<script lang="ts">
import {prefix} from '@/config/global';
import {SearchIcon} from 'tdesign-icons-vue';
import custApi from "@/constants/api/imiao-cust/imiao-cust-api";
import MemberCard from "@/components/member-card/index.vue";

const INITIAL_DATA = {
  name: '',
  status: '',
  description: '',
  type: '',
  mark: '',
  amount: 0,
};
const INITIAL_QUERY = {
  pageNum: 1,
  sizeNum: 12,
  nickname: ''
}

export default {
  name: 'ListCard',
  components: {
    SearchIcon,
    MemberCard,
  },
  data() {
    return {
      pagination: {pageNum: 1, sizeNum: 12, total: 0},
      prefix,
      productList: [],
      memberList: [],
      value: 'first',
      rowKey: 'index',
      tableLayout: 'auto',
      verticalAlign: 'top',
      bordered: true,
      hover: true,
      rowClassName: (rowKey) => `${rowKey}-class`,
      formData: {...INITIAL_DATA},
      options: [
        {label: '在职', value: '1'},
        {label: '请假', value: '2'},
        {label: '休假', value: '3'},
      ],
      formVisible: false,
      textareaValue: '',
      rules: {
        name: [{required: true, message: '请输入产品名称', type: 'error'}],
      },
      query: {...INITIAL_QUERY},
      confirmVisible: false, // 控制确认弹窗
      deleteProduct: undefined,
      dataLoading: false,
    };
  },
  computed: {
    confirmBody(): string {
      const {deleteProduct} = this;
      return deleteProduct ? `开除后，${deleteProduct.nickname}的所有相关数据将被清空, 且无法恢复` : '';
    },

  },
  watch: {
    'pagination.sizeNum': function (val) {
      this.query.sizeNum = val
    },
    'pagination.pageNum': function (val) {
      this.query.pageNum = val
    },
  },
  mounted() {
    this.dataLoading = true;
    this.initMemberList()
  },
  methods: {
    async queryMemberList() {
      const res = await custApi.queryAdmins(this.query)
      this.memberList = res.data.list;
      this.pagination.total = res.data.total;
    },
    async initMemberList() {
      console.log('开始执行初始化【成员列表】请求')
      const res = await custApi.getAdminList(this.pagination);
      this.memberList = res.data.list;
      this.pagination.total = res.data.total;
      console.log(res)
      this.dataLoading = false;
    },
    onPageSizeChange(size: number): void {
      this.pagination.pageSize = size;
      this.pagination.current = 1;
      this.initMemberList();
    },
    onCurrentChange(current: number): void {
      console.log('current发生了改变')
      console.log(current)
      this.pagination.pageNum = current;
      this.initMemberList();
    },
    jumpRouter() {
      this.$router.push('/shop/addAdmin')
    },
    onSubmit({result, firstError}): void {
      if (!firstError) {
        this.$message.success('提交成功');
        this.formVisible = false;
      } else {
        console.log('Errors: ', result);
        this.$message.warning(firstError);
      }
    },
    onClickCloseBtn(): void {
      this.formVisible = false;
      this.formData = {};
    },
    handleDeleteItem(member): void {
      this.confirmVisible = true;
      this.deleteProduct = member;
    },
    onConfirmDelete(): void {
      const {adminId} = this.deleteProduct;
      const index = this.memberList.findIndex(member => member.adminId === adminId);
      if (index >= 0) {
        this.memberList.splice(index, 1);
        this.$message.success('开除成功');
      }
      this.confirmVisible = false;
    },
    onCancel(): void {
      this.deleteProduct = undefined;
      this.formData = {};
    },
    handleManageProduct(product): void {
      this.formVisible = true;
      this.formData = {...product, status: product?.isSetup ? '1' : '0'};
    },
  },
};
</script>
<style scoped lang="less">
.list-card-operation {
  display: flex;
  justify-content: space-between;

  .search-input {
    width: 360px;
  }
}

.list-card-items {
  margin: 14px 0 24px 0;
}



</style>
