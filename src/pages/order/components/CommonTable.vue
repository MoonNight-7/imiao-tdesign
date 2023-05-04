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
              <t-form-item label="订单编号" name="orderId" help="支持模糊查询👍">
                <t-input
                  v-model="query.orderId"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入订单编号"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
              <t-form-item label="订单状态" name="orderStatus">
                <t-select
                  v-model="query.orderStatus"
                  class="form-item-content`"
                  :options="CONTRACT_STATUS_OPTIONS"
                  placeholder="请选择订单状态"
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
        <template #orderStatus="{ row }">
          <t-tag v-if="row.orderStatus === CONTRACT_STATUS.AUDIT_PENDING" theme="danger" variant="light">未付款</t-tag>
          <t-tag v-if="row.orderStatus === CONTRACT_STATUS.EXEC_PENDING" theme="warning" variant="light">已付款</t-tag>
        </template>
        <template #startDate="{ row }">
          <span>{{ row.startDate.split('T')[0] }}</span>
        </template>
        <template #endDate="{ row }">
          <span>{{ row.endDate.split('T')[0] }}</span>
        </template>
        <template #op="slotProps">
          <!--          <a class="t-button-link" @click="rehandleClickOp(slotProps)">付款</a>-->
          <!--          <a class="t-button-link" @click="handleClickDelete(slotProps)">取消</a>-->
          <t-button @click="handlePayOrder(slotProps)" :disabled=" slotProps.row.orderStatus===2">付款</t-button>
          <t-button @click="handleCancel(slotProps)" variant="dashed" :disabled=" slotProps.row.orderStatus===2">取消</t-button>
        </template>
      </t-table>
      <t-dialog header="请确认当前订单" :visible.sync="formVisible" :width="680" :footer="false">
        <div slot="body">
          <!-- 表单内容 -->
          <t-form :data="formData" ref="form" @submit="handleUpdateUserInfo" :labelWidth="100">
            <t-form-item label="订单金额" name="enable">
              <t-input v-model="formData.totalPrice" :disabled="true" />
            </t-form-item>
            <t-form-item style="float: right">
              <t-button variant="outline" @click="onClickCloseBtn">取消</t-button>
              <t-button theme="primary" type="submit">付款</t-button>
            </t-form-item>
          </t-form>
        </div>
      </t-dialog>

      <t-dialog
        header="确认取消当前所选订单？"
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
import catApi from "@/constants/api/imiao-cat/imiao-cat-api";
import store from "@/store";

const INITIAL_QUERY = {
  pageNum: 1,
  pageSize: 20,
  userId: undefined,
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
      formData: {},
      userIsEnable: 1,
      query: {...INITIAL_QUERY},
      data: [],
      dataLoading: false,
      value: 'first',
      columns: [
        {
          title: '订单编号',
          fixed: 'left',
          width: 200,
          align: 'left',
          ellipsis: true,
          colKey: 'orderId',
        },
        {title: '订单状态', colKey: 'orderStatus', width: 200, cell: {col: 'orderStatus'}},
        {
          title: '订单总价（元）',
          width: 200,
          ellipsis: true,
          colKey: 'totalPrice',
        },
        {
          title: '开始时间', colKey: 'startDate', width: 200, cell: {col: 'startDate'},
        },
        {
          title: '结束时间', colKey: 'endDate', width: 200, cell: {col: 'endDate'},
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
      formVisible: false,
      deleteIdx: -1,
      deleteUserId: '',
      deleteDisabled: false,
      rules: {},
      userData: {},
    };
  },
  computed: {
    confirmBody() {
      if (this.deleteIdx > -1) {
        const {nickname} = this.data?.[this.deleteIdx];
        return `取消订单后无法恢复`;
      }
      return '';
    },
    offsetTop() {
      return this.$store.state.setting.isUseTabsRouter ? 48 : 0;
    },
  },
  mounted() {
    this.dataLoading = true;
    this.userData = store.getters['user/userData'];
    this.query.userId = this.userData.userId
    this.initOrderData()
  },
  methods: {
    initOrderData() {
      catApi.getOrderList(this.query).then((res) => {
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
      catApi.getOrderList(this.query).then((res) => {
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
      this.query.pageSize = curr.pageSize;
      this.onSubmit();
    },
    rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
    },
    rehandleClickOp({text, row}) {
      console.log(text, row);
      this.formData.userId = row.userId;
      this.userIsEnable = row.enable;
      this.formVisible = true;
    },
    handleUpdateUserInfo() {
      catApi.payOrder(this.formData.orderId).then((res) => {
        this.$message.success('支付成功');
        this.initOrderData()
      }).finally(() => {
        this.formVisible = false;
      })
    },
    onClickCloseBtn() {
      this.formVisible = false;
      this.formData = {};
    },
    handleClickDelete(row) {
      const {userId} = row.row;
      this.deleteUserId = userId;
      this.deleteIdx = row.rowIndex;
      this.confirmVisible = true;
    },
    onConfirmDelete() {
      // 真实业务请发起请求
      this.data.splice(this.deleteIdx, 1);
      this.pagination.total = this.data.length;
      this.confirmVisible = false;
      this.resetIdx();
    },
    onCancel() {
      this.resetIdx();
    },
    resetIdx() {
      this.deleteIdx = -1;
    },
    handlePayOrder(order) {
      this.formData = order.row
      console.log(order)
      this.formVisible = true;

    },
    handleCancel(row) {
      const {userId} = row.row;
      this.deleteUserId = userId;
      this.deleteIdx = row.rowIndex;
      this.confirmVisible = true;

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
