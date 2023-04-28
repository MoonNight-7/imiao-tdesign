<template>
  <t-row :gutter="[16, 16]">
    <t-col :flex="3">
      <div class="user-left-greeting">
        <div>
          Hi，{{adminDetail.姓名}}
          <span class="regular"> {{ greeting }}{{ daySince ? `，今天是你加入猫厂的第 ${daySince} 天~` : '' }}</span>
<!--          <t-button @click="initPermissionDetail">初始化权限信息</t-button>-->
        </div>
        <img style="width: 100px" src="https://media2.giphy.com/media/PyKQxHLNGpK1F3kI00/giphy.gif" class="logo"/>
      </div>

      <t-card class="user-info-list" title="个人信息" :bordered="false">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <edit-icon size="18"/>
          </t-button>
        </template>
        <t-row class="content" justify="space-between">
          <t-col v-for="(value, key) in adminDetail" :key="key" class="contract" :span="4">
            <div class="contract-title">
              {{ USER_INFO_LABELS[key] || key }}
            </div>
            <div class="contract-detail">
              {{ value || "无" }}
            </div>
          </t-col>
        </t-row>
      </t-card>

      <t-card class="content-container" :bordered="false">
        <t-tabs value="second">
<!--          <t-tab-panel value="first" label="内容列表">-->
<!--            <p>内容列表</p>-->
<!--          </t-tab-panel>-->
          <t-tab-panel value="second" label="内容列表">
            <result-maintenance/>
<!--            <t-card :bordered="false" title="主页访问数据" subtitle="77（次）">-->
<!--              <template #options>-->
<!--                <t-date-rang-picker-->
<!--                  class="card-date-picker-container"-->
<!--                  :default-value="LAST_7_DAYS"-->
<!--                  theme="primary"-->
<!--                  mode="date"-->
<!--                  @change="onLineChange"-->
<!--                />-->
<!--              </template>-->
<!--              <div id="lineContainer" style="width: 100%; height: 330px"/>-->
<!--            </t-card>-->
          </t-tab-panel>
<!--          <t-tab-panel value="third" label="内容列表">-->
<!--            <p>内容列表</p>-->
<!--          </t-tab-panel>-->
        </t-tabs>
      </t-card>
    </t-col>

    <t-col :flex="1">
      <t-card class="user-intro" :bordered="false">
        <t-avatar size="90px">T</t-avatar>
        <div class="name">编号：{{adminDetail.管理员编号}}</div>
        <div class="position">岗位：iMiao普通员工</div>
        <div class="position">权限：{{ permissionDetail.name }}</div>
        <div class="position">权限描述：{{ permissionDetail.description }}</div>
      </t-card>

      <t-card title="团队成员" class="user-team" :bordered="false">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <edit-icon size="18"/>
          </t-button>
        </template>
        <t-list :split="false">
          <t-list-item v-for="(item, index) in TEAM_MEMBERS" :key="index">
            <t-list-item-meta :image="item.avatar" :title="item.title" :description="item.description"/>
          </t-list-item>
        </t-list>
      </t-card>

      <t-card title="服务产品" class="product-container" :bordered="false">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <edit-icon size="18"/>
          </t-button>
        </template>
        <t-row class="content" :getters="16">
          <t-col :span="3">
            <product-a-icon/>
          </t-col>
          <t-col :span="3">
            <product-b-icon/>
          </t-col>
          <t-col :span="3">
            <product-c-icon/>
          </t-col>
          <t-col :span="3">
            <product-d-icon/>
          </t-col>
        </t-row>
      </t-card>
    </t-col>
  </t-row>
</template>
<script>
import {GridComponent, TooltipComponent, LegendComponent} from 'echarts/components';
import {LineChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import * as echarts from 'echarts/core';
import {EditIcon} from 'tdesign-icons-vue';

import {mapState} from 'vuex';

import {getFolderLineDataSet} from './index';
import {changeChartsTheme} from '@/utils/color';
import {LAST_7_DAYS} from '@/utils/date';

import {USER_INFO_LIST, TEAM_MEMBERS, PRODUCT_LIST} from '@/service/service-user';
import ProductAIcon from '@/assets/assets-product-1.svg';
import ProductBIcon from '@/assets/assets-product-2.svg';
import ProductCIcon from '@/assets/assets-product-3.svg';
import ProductDIcon from '@/assets/assets-product-4.svg';
import custApi from "@/constants/api/imiao-cust/imiao-cust-api";
import store from "@/store";
import ResultMaintenance from "@/pages/result/maintenance/index.vue";

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

const USER_INFO_LABELS = {
  adminId: '管理员编号',
  username: '用户名',
  phone: '手机号码',
  avatarUrl: '头像地址',
  enable: '是否启用',
  nickname: '姓名',
  permissionId: '权限编号',
  permissionName: '权限名称',
  loginCount: '登录次数',
  gmtLastLogin: '最近登录时间',
  gmtCreate: '创建时间',
  gmtModified: '修改时间',
};
export default {
  name: 'UserIndex',

  components: {
    ResultMaintenance,
    ProductAIcon,
    ProductBIcon,
    ProductCIcon,
    ProductDIcon,
    EditIcon,
  },
  data() {
    return {
      dashboardBase: '',
      lineContainer: '',
      lineChart: '',
      LAST_7_DAYS,
      USER_INFO_LIST,
      USER_INFO_LABELS,
      TEAM_MEMBERS,
      PRODUCT_LIST,
      adminDetail: {},
      daySince:'',
      permissionId: '',
      permissionDetail:{},
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
    greeting() {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) {
        return '上午好';
      } else if (hour >= 12 && hour < 18) {
        return '下午好';
      } else {
        return '晚上好';
      }
    },
  },
  watch: {
    brandTheme() {
      changeChartsTheme([this.lineChart]);
    },
    mode() {
      this.renderCharts();
    },
    lineChart() {
      this.updateContainer();
    },
  },
  async mounted() {
    await this.initAdminDetail()
    await this.initPermissionDetail()
    window.addEventListener('resize', this.updateContainer, false);
    this.renderCharts();
    this.$nextTick(() => {
      this.updateContainer();
    });
  },
  methods: {
    filterData(data) {
      const filteredData = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(data)) {
        switch (key) {
        case 'adminId':
          filteredData['管理员编号'] = value;
          break;
        case 'username':
          filteredData['用户名'] = value;
          break;
        case 'phone':
          filteredData['手机号码'] = `+86 ${value}`;
          break;
        case 'enable':
          filteredData['是否启用'] = value === 1 ? '启用' : '禁用';
          break;
        case 'nickname':
          filteredData['姓名'] = value;
          break;
        case 'permissionName':
          filteredData['职位'] = value;
          break;
        default:
          break;
        }
      }
      return filteredData;
    },
    async initPermissionDetail() {
      const res = await custApi.getPermissionDetail(this.permissionId);
      this.permissionDetail = res.data
      console.log(this.permissionDetail)
    },
    async initAdminDetail() {
      const admin = store.getters['user/userData'];
      const id = admin.userId;
      const res = await custApi.getAdminById(id);
      this.permissionId = res.data.permissionId;
      this.adminDetail = this.filterData(res.data);
      const createDate = res.data.gmtCreate ? res.data.gmtCreate.replace(/-/g,"/") : '';
      const date = new Date(createDate)
      this.daySince = this.getDaysSince(createDate);
    },
    getDaysSince(dateStr) {
      const today = new Date();
      const date = new Date(dateStr);
      console.log(date)
      console.log(today)
      const timeDiff = today.getTime() - date.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return dayDiff;
    },
    /** 图表选择 */
    onLineChange(value) {
      this.lineChart.setOption(getFolderLineDataSet({dateTime: value}));
    },
    updateContainer() {
      this.lineChart.resize?.({
        width: this.lineContainer.clientWidth,
        height: this.lineContainer.clientHeight,
      });
    },
    renderCharts() {
      const {chartColors} = this.$store.state.setting;
      if (!this.lineContainer) {
        this.lineContainer = document.getElementById('lineContainer');
      }
      this.lineChart = echarts.init(this.lineContainer);
      this.lineChart.setOption({
        grid: {
          x: 30, // 默认是80px
          y: 30, // 默认是60px
          x2: 10, // 默认80px
          y2: 30, // 默认60px
        },
        ...getFolderLineDataSet({...chartColors}),
      });
    },
    getIcon(type) {
      const typeMap = {
        a: ProductAIcon,
        b: ProductBIcon,
        c: ProductCIcon,
        d: ProductDIcon,
      };
      return typeMap[type || 'a'];
    },
  },
};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
