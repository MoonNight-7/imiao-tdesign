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
              <t-form-item label="平均寿命（年）" name="lifeExpectancy">
                <t-input-number theme="column" :min="1" v-model="formData.lifeExpectancy" :style="{ width: '322px' }"
                                placeholder="请输入内容"/>
              </t-form-item>
            </t-col>

            <t-col :span="4">
              <t-form-item label="平均体重（公斤）" name="averageWeight">
                <t-input-number theme="column" step="0.1" min="0" v-model="formData.averageWeight"
                                :style="{ width: '322px' }" placeholder="请输入内容"/>
              </t-form-item>
            </t-col>

            <t-col :span="4">
              <t-form-item label="毛发长度（厘米）" name="coatLength">
                <t-range-input
                  v-model="formData.coatLength"
                  :style="{ width: '322px' }"
                  :min="0"
                  :max="100"
                  placeholder="请输入内容"
                />
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
import countryList from '@surbowl/world-geo-json-zh/world.zh.json'
import catApi from "@/constants/api/imiao-cat/imiao-cat-api";


const INITIAL_DATA = {
  averageWeight: '',
  coatLength: [],
  color: '',
  countryOfOrigin: '',
  lifeExpectancy: '',
  speciesDescription: '',
  speciesName: '',
  temperament: '',
};
const FORM_RULES = {
  averageWeight: [{required: true, message: '请输入平均体重', type: 'error'}],
  coatLength: [
    {
      validator: (val) => {
        if (!Array.isArray(val) || val.length !== 2) {
          return { result: false, message: '请输入有效的毛发长度范围', type: 'error' };
        }
        const [min, max] = val.map(Number); // 将字符串值转换为数字
        if (isNaN(min) || isNaN(max) || min < 0 || max > 100) {
          return { result: false, message: '毛发长度范围应在 0-100 厘米之间', type: 'error' };
        }
        return true;
      },
    },
  ],
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
      coatLengthArr: '',
      FORM_RULES,
      textareaValue: '',
      selectedCountry: '',
      countryOptions: countryList.features.map(feature => ({
        label: feature.properties.name,
        value: feature.properties.name
      })),

    };
  },
  computed: {
    coatLength: {
      get() {
        return this.formData.coatLength;
      },
      set(value) {
        this.formData.coatLength = value.map(Number);
      },
    },
  },
  mounted() {
  },
  methods: {
    changeStatus() {
      this.stepSuccess = !this.stepSuccess;
    },
    onReset() {
      this.$message.warning('取消新建');
    },
    async onSubmit({validateResult}) {
      if (validateResult === true) {
        // 将 coatLength 数组转换为所需的字符串格式
        const coatLengthString = this.formData.coatLength.join('~');

        // 创建一个新的对象，包含转换后的 coatLength 字段
        const requestData = {
          ...this.formData,
          coatLength: coatLengthString,
        };

        console.log(requestData);

        const res = await catApi.addSpecies(requestData);
        if (res.state === 200) {
          await this.$message.success('新建成功！');
          this.formData = {...INITIAL_DATA};
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
