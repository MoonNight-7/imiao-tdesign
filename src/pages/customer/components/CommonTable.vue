<template>
  <div class="list-common-table">
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
              <t-form-item label="客户名称" name="nickname">
                <t-input
                  v-model="query.nickname"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入客户名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
              <t-form-item label="客户状态" name="enable">
                <t-select
                  v-model="query.enable"
                  class="form-item-content`"
                  :options="CONTRACT_STATUS_OPTIONS"
                  placeholder="请选择客户状态"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
              <t-form-item label="客户编号" name="userId">
                <t-input
                  v-model="query.userId"
                  class="form-item-content"
                  placeholder="请输入客户编号"
                  :style="{ minWidth: '134px' }"
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
    <div class="table-container">
      <t-table
        :data="data"
        :columns="columns"
        :rowKey="rowKey"
        :verticalAlign="verticalAlign"
        :hover="hover"
        :pagination="pagination"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
        :loading="dataLoading"
        :headerAffixedTop="true"
        :headerAffixProps="{ offsetTop, container: getContainer }"
      >
        <template #status="{ row }">
          <t-tag v-if="row.enable === CONTRACT_STATUS.FAIL" theme="danger" variant="light">已封禁</t-tag>
          <t-tag v-if="row.enable === CONTRACT_STATUS.AUDIT_PENDING" theme="warning" variant="light">已启用</t-tag>
        </template>
        <template #gender="{ row }">
          <p v-if="row.gender === 1" class="payment-col">
            男
          </p>
          <p v-if="row.gender === 0" class="payment-col">
            女
          </p>
        </template>
        <template #op="slotProps">
          <a class="t-button-link" @click="rehandleClickOp(slotProps)">管理</a>
          <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
        </template>
      </t-table>
      <t-dialog
        header="确认删除当前所选用户？"
        :body="confirmBody"
        :visible.sync="confirmVisible"
        @confirm="onConfirmDelete"
        :onCancel="onCancel"
      >
      </t-dialog>
    </div>
  </div>
</template>
<script>
import {prefix} from '@/config/global';
import Trend from '@/components/trend/index.vue';

import {
  CONTRACT_STATUS,
  CONTRACT_STATUS_OPTIONS,
  CONTRACT_TYPES,
  CONTRACT_TYPE_OPTIONS,
  CONTRACT_PAYMENT_TYPES,
} from '@/constants/customer';
import custApi from "@/constants/api/imiao-cust/imiao-cust-api";

const INITIAL_QUERY = {
  pageNum: 1,
  sizeNum: 20,
  nickname: '',
  userId: undefined,
  enable: undefined,
}
export default {
  name: 'list-table',
  components: {
    Trend,
  },
  data() {
    return {
      CONTRACT_STATUS,
      CONTRACT_STATUS_OPTIONS,
      CONTRACT_TYPES,
      CONTRACT_TYPE_OPTIONS,
      CONTRACT_PAYMENT_TYPES,
      prefix,
      formData: {
        nickname: '',
        userId: undefined,
        enable: undefined,
      },
      query: {...INITIAL_QUERY},
      data: [],
      dataLoading: false,
      value: 'first',
      columns: [
        {
          title: '客户名称',
          fixed: 'left',
          width: 200,
          align: 'left',
          ellipsis: true,
          colKey: 'nickname',
        },
        {title: '客户状态', colKey: 'status', width: 200, cell: {col: 'status'}},
        {
          title: '客户编号',
          width: 200,
          ellipsis: true,
          colKey: 'userId',
        },
        {
          title: '手机号',
          width: 200,
          ellipsis: true,
          colKey: 'phone',
        },
        {
          title: '账户余额（元）',
          width: 200,
          ellipsis: true,
          colKey: 'balance',
        },
        {
          title: '性别',
          width: 200,
          ellipsis: true,
          colKey: 'gender',
        },
        {
          align: 'left',
          fixed: 'right',
          width: 200,
          colKey: 'op',
          title: '操作',
        },
      ],
      rowKey: 'index',
      tableLayout: 'auto',
      verticalAlign: 'top',
      bordered: true,
      hover: true,
      rowClassName: (rowKey) => `${rowKey}-class`,
      // 与pagination对齐
      pagination: {
        defaultPageSize: 20,
        total: 100,
        defaultCurrent: 1,
      },
      confirmVisible: false,
      deleteIdx: -1,
    };
  },
  computed: {
    confirmBody() {
      if (this.deleteIdx > -1) {
        const {nickname} = this.data?.[this.deleteIdx];
        return `删除后，${nickname}的所有信息将被清空，且无法恢复`;
      }
      return '';
    },
    offsetTop() {
      return this.$store.state.setting.isUseTabsRouter ? 48 : 0;
    },
  },
  mounted() {
    this.dataLoading = true;
    this.initCustomerData()
  },
  methods: {
    initCustomerData() {
      custApi.quertUsers(this.query).then((res) => {
        this.data = res.data.list;
        this.pagination = {
          ...this.pagination,
          total: res.data.total,
        };
      }).finally(() => {
        this.dataLoading = false;
      })
    },
    getContainer() {
      return document.querySelector('.tdesign-starter-layout');
    },
    onReset(data) {
      console.log(data);
    },
    onSubmit() {
      console.log(this.query);
      custApi.quertUsers(this.query).then((res) => {
        this.data = res.data.list;
        this.pagination = {
          ...this.pagination,
          total: res.data.total,
        };
      });
    },
    rehandlePageChange(curr, pageInfo) {
      console.log('分页变化', curr, pageInfo);
      this.query.pageNum = curr.current;
      this.query.sizeNum = curr.pageSize;
      this.onSubmit();
    },
    rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
    },
    rehandleClickOp({text, row}) {
      console.log(text, row);
    },
    handleClickDelete(row) {
      this.deleteIdx = row.rowIndex;
      this.confirmVisible = true;
    },
    onConfirmDelete() {
      // 真实业务请发起请求
      this.data.splice(this.deleteIdx, 1);
      this.pagination.total = this.data.length;
      this.confirmVisible = false;
      this.$message.success('删除成功');
      this.resetIdx();
    },
    onCancel() {
      this.resetIdx();
    },
    resetIdx() {
      this.deleteIdx = -1;
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: 30px 32px;
  border-radius: var(--td-radius-default);
}

.form-item-content {
  width: 100%;
}

.operation-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}

.t-button + .t-button {
  margin-left: var(--td-comp-margin-s);
}
</style>
