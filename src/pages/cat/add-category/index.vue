<template>
  <t-card :bordered="false">
    <t-form
      ref="form"
      :data="formData"
      :rules="FORM_RULES"
      label-align="top"
      :label-width="100"
      @reset="onReset"
      @submit="onSubmit"
    >
      <div class="form-basic-container">
        <div class="form-basic-item">
          <div class="form-basic-container-title">新增品种</div>
          <!-- 表单内容 -->

          <t-row class="row-gap" :gutter="[16, 24]">
            <t-col :span="4">
              <t-form-item label="品种名称" name="speciesName">
                <t-input v-model="formData.speciesName" :style="{ width: '322px' }" placeholder="请输入内容"/>
              </t-form-item>
            </t-col>

            <t-col :span="4">
              <t-form-item label="平均寿命" name="lifeExpectancy">
                <t-input v-model="formData.lifeExpectancy" :style="{ width: '322px' }" placeholder="请输入内容"/>
              </t-form-item>
            </t-col>

            <t-col :span="4">
              <t-form-item label="平均体重" name="averageWeight">
                <t-input v-model="formData.averageWeight" :style="{ width: '322px' }" placeholder="请输入内容"/>
              </t-form-item>
            </t-col>

            <t-col :span="4">
              <t-form-item label="毛发长度（厘米）" name="coatLength">
                <t-input v-model="formData.coatLength" :style="{ width: '322px' }" placeholder="请输入内容"/>
              </t-form-item>
            </t-col>

            <t-col :span="4">
              <t-form-item label="颜色" name="color">
                <t-input v-model="formData.color" :style="{ width: '322px' }" placeholder="请输入内容"/>
              </t-form-item>
            </t-col>

            <t-col :span="4">
              <t-form-item label="性格" name="temperament">
                <t-input v-model="formData.temperament" :style="{ width: '322px' }" placeholder="请输入内容"/>
              </t-form-item>
            </t-col>

            <t-col :span="4">
              <t-form-item label="起源地" name="countryOfOrigin">
                <t-select
                  v-model="formData.countryOfOrigin"
                  :style="{ width: '322px' }"
                  :options="countryOptions"
                  filterable
                  placeholder="请选择一个国家"
                >
                </t-select>
              </t-form-item>
            </t-col>
          </t-row>

          <div class="form-basic-container-title form-title-gap">其它信息</div>

          <t-form-item label="描述" name="speciesDescription">
            <t-textarea v-model="formData.speciesDescription" :height="124" placeholder="请输入描述信息"/>
          </t-form-item>
        </div>
      </div>




      <div class="form-submit-container">
        <div class="form-submit-sub">
          <div class="form-submit-left">
            <t-button theme="primary" class="form-submit-confirm" type="submit"> 提交</t-button>
            <t-button type="reset" class="form-submit-cancel" theme="default" variant="base"> 取消</t-button>
          </div>
        </div>
      </div>
    </t-form>
  </t-card>
</template>
<script>
import {prefix} from '@/config/global';
import custApi from "@/constants/api/imiao-cust/imiao-cust-api";
import countryList from '@surbowl/world-geo-json-zh/world.zh.json'


const INITIAL_DATA = {
  averageWeight: '',
  coatLength: '',
  color: '',
  countryOfOrigin: '',
  lifeExpectancy: '',
  speciesDescription:'',
  speciesName:'',
  temperament:'',
};
const FORM_RULES = {
  averageWeight: [{required: true, message: '请输入平均体重', type: 'error'}],
  coatLength: [{required: true, message: '请输入毛发长度', type: 'error'}],
  color: [{required: true, message: '请输入颜色', type: 'error'}],
  countryOfOrigin: [{required: true, message: '请选择起源地', type: 'error'}],
  lifeExpectancy: [{required: true, message: '请输入平均寿命', type: 'error'}],
  speciesDescription: [{required: true, message: '请输入描述', type: 'error'}],
  speciesName: [{required: true, message: '请输入品种名称', type: 'error'}],
  temperament: [{required: true, message: '请输入性格', type: 'error'}],
};

export default {
  name: 'FormBase',
  data() {
    return {
      prefix,
      stepSuccess: true,
      formData: {...INITIAL_DATA},
      FORM_RULES,
      permissionOptions: [
        {label: '超管', value: '1'},
        {label: '普通', value: '2'},
        {label: '类型C', value: '3'},
      ],
      textareaValue: '',


      selectedCountry: '',
      countryOptions: countryList.features.map(feature => ({
        label: feature.properties.name,
        value: feature.properties.iso_a3
      })),

    };
  },
  mounted() {
    this.initPermissionList();
  },
  methods: {
    async initPermissionList() {
      const res = await custApi.getPermissionList();
      this.permissionOptions = res.data
    },

    changeStatus() {
      this.stepSuccess = !this.stepSuccess;
    },
    onReset() {
      this.$message.warning('取消新建');
    },
    async onSubmit({validateResult}) {
      if (validateResult === true) {
        // const res = await custApi.adminAddNew(this.formData)
        // if (res.state === 200) {
        //   this.$message.success('新建成功！')
        //   this.formData = {...INITIAL_DATA};
        // }
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
