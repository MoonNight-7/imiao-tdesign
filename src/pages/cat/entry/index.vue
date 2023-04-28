<template>
  <t-card :bordered="false">
    <div class="form-step-container">
      <!-- 简单步骤条 -->
      <t-card :bordered="false">
        <t-steps :defaultCurrent="1" :current="activeForm" status="process">
          <t-step-item title="类别信息" content="选定基本类型"></t-step-item>
          <t-step-item title="基本信息" content="填写基本信息"></t-step-item>
          <t-step-item title="展示相关" content="选定是否展示或启用"></t-step-item>
          <t-step-item title="完成" content=""></t-step-item>
        </t-steps>
      </t-card>

      <!-- 分步表单1 -->
      <div v-show="activeForm === 2" class="rule-tips">
        <t-alert theme="info" title="启用规则&温馨提示：" :close="true">
          <div slot="message">
            <p class="span-txt">
              1、启用该猫咪后，用户可以在前台看到该猫咪。
            </p>
            <p class="span-txt">2、将猫咪设置为可租，用户可对猫咪进行租赁。</p>
            <p class="span-txt">3、选择图片后务必先点击【点击上传】，再点击下一步</p>
            <p class="span-txt">4、如有疑问请直接联系：15661477211。</p>
          </div>
        </t-alert>
      </div>
      <t-form
        v-show="activeForm === 0"
        class="step-form"
        :data="formData1"
        :rules="rules"
        labelAlign="right"
        @submit="onSubmit1"
      >
        <t-form-item label="猫咪种类" name="speciesId">
          <t-select :style="{ width: '390px' }" v-model="formData1.speciesId" class="demo-select-base" clearable>
            <t-option v-for="(item, index) in speciesOptions" :value="item.value" :label="item.label" :key="index">
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="拥有者类型" name="ownerTypeId">
          <t-select :style="{ width: '390px' }" v-model="formData1.ownerTypeId" class="demo-select-base" clearable>
            <t-option v-for="(item, index) in ownerOptions" :value="item.value" :label="item.label" :key="index">
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item>
          <t-button theme="primary" type="submit">下一步</t-button>
        </t-form-item>
      </t-form>

      <!-- 分步表单2 -->
      <t-form
        v-show="activeForm === 1"
        class="step-form"
        :data="formData2"
        :rules="rules"
        labelAlign="right"
        @reset="onReset2"
        @submit="onSubmit2"
      >
        <t-form-item label="猫咪昵称" name="catName">
          <t-input :style="{ width: '480px' }" v-model="formData2.catName" placeholder="请输入猫咪昵称"></t-input>
        </t-form-item>
        <t-form-item label="猫咪年龄" name="catAge">
          <t-input :style="{ width: '480px' }" v-model="formData2.catAge" placeholder="请输入猫咪年龄"></t-input>
        </t-form-item>
        <t-form-item label="出租价格" name="catPrice">
          <t-input :style="{ width: '480px' }" v-model="formData2.catPrice"
                   placeholder="请输入出租价格（元/天）"></t-input>
        </t-form-item>
        <t-form-item label="颜色" name="color">
          <t-input :style="{ width: '480px' }" v-model="formData2.color"
                   placeholder="请输入颜色，例：黄色、白色"></t-input>
        </t-form-item>
        <t-form-item label="体重" name="catWeight">
          <t-input :style="{ width: '480px' }" v-model="formData2.catWeight" placeholder="请输入体重（公斤）"></t-input>
        </t-form-item>
        <t-form-item>
          <t-button type="reset" theme="default" variant="base">上一步</t-button>
          <t-button theme="primary" type="submit">下一步</t-button>
        </t-form-item>
      </t-form>

      <!-- 分步表单3 -->
      <t-form
        v-show="activeForm === 2"
        class="step-form"
        :data="formData3"
        :rules="rules"
        labelAlign="left"
        @reset="onReset3"
        @submit="onSubmit3"
      >
        <t-form-item label="是否启用" name="enable">
          <t-switch size="large" v-model="formData3.enable" :label="['启用', '禁用']" :customValue="[1,0]"/>
        </t-form-item>
        <t-form-item label="是否可租" name="available">
          <t-switch size="large" v-model="formData3.available" :label="['可以', '不可']" :customValue="[1,0]"/>
        </t-form-item>
        <t-form-item label="简介" name="catDescription">
          <t-textarea
            :style="{ width: '480px' }"
            v-model="formData3.catDescription"
            placeholder="请输入描述信息"
          ></t-textarea>
        </t-form-item>
        <t-form-item label="图片" name="catPictures">
          <t-upload
            ref="upload"
            action="http://39.104.55.195:10001/imiao-cat/upload/upload"
            v-model="pic"
            :autoUpload="false"
            name="pic"
            :headers="token"
            placeholder="支持批量上传图片文件"
            theme="image-flow"
            accept="image/*"
            :max="5"
            multiple
            @success="onSuccess"
            @dragenter="onDragenter"
            @dragleave="onDragleave"
            @drop="onDrop"
          ></t-upload>
        </t-form-item>
        <t-form-item>
          <t-button type="reset" theme="default" variant="base">上一步</t-button>
          <t-button theme="primary" type="submit">下一步</t-button>
        </t-form-item>
      </t-form>

      <!-- 分步表单4 -->
      <div class="step-form-4" v-show="activeForm === 6">
        <check-circle-filled-icon style="color: green" size="52px"/>
        <p class="text">完成猫咪入店</p>
        <p class="tips">预计1～3分钟后会添加至猫咪列表，请耐心等待</p>
        <div class="button-group">
          <t-button @click="onReset4" theme="primary">再次添加</t-button>
<!--          <t-button @click="onSubmit4" variant="base" theme="default">查看进度</t-button>-->
        </div>
      </div>
    </div>
  </t-card>
</template>
<script>
import {CheckCircleFilledIcon} from 'tdesign-icons-vue';
import {prefix} from '@/config/global';
import catApi from "@/constants/api/imiao-cat/imiao-cat-api";

const INITIAL_DATA1 = {
  speciesId: '',
  ownerTypeId: '',
};
const INITIAL_DATA2 = {
  catWeight: '',
  catPrice: '',
  catAge: '',
  catName: '',
  color: '',
};
const INITIAL_DATA3 = {
  enable: 0,
  available: 0,
  catPictures: '',
  catDescription: '',
};

export default {
  name: 'FormStep',
  components: {
    CheckCircleFilledIcon,
  },
  data() {
    return {
      prefix,
      formData1: {...INITIAL_DATA1},
      formData2: {...INITIAL_DATA2},
      formData3: {...INITIAL_DATA3},
      pic: [],
      token: {Authorization: localStorage.getItem('jwt')},
      speciesOptions: [],
      ownerOptions: [],
      rules: {
        speciesId: [{required: true, message: '请选择种类', type: 'error'}],
        ownerTypeId: [{required: true, message: '请选择拥有者类型', type: 'error'}],
        catWeight: [{required: true, message: '请输入体重', type: 'error'}],
        catPrice: [{required: true, message: '请输入价格', type: 'error'}],
        catAge: [{required: true, message: '请输入年龄', type: 'error'}],
        catName: [{required: true, message: '请输入猫咪名称', type: 'error'}],
        color: [{required: true, message: '请输入颜色', type: 'error'}],
        enable: [{required: true, message: '请选择是否启用', type: 'error'}],
        available: [{required: true, message: '请选择是否可租', type: 'error'}],
        catPictures: [{required: true, message: '请上传图片', type: 'error'}],
        catDescription: [{required: true, message: '请输入描述信息', type: 'error'}],
      },
      activeForm: 0,
    };
  },
  computed: {},
  mounted() {
    this.initCatSpecies()
    this.initOwnerType()
  },
  methods: {
    onSubmit1({validateResult}) {
      if (validateResult === true) {
        this.activeForm = 1;
      }
    },
    onSubmit2({validateResult}) {
      if (validateResult === true) {
        this.activeForm = 2;
      }
    },
    onReset2() {
      this.activeForm = 0;
    },
    async onSubmit3({validateResult}) {
      if (validateResult === true) {
        const mergedFormData = {...this.formData1, ...this.formData2, ...this.formData3};
        const res = await catApi.addCatInfo(mergedFormData)
        console.log(res)
        if (res.state === 200) {
          this.$message.success("猫咪入店成功")
          this.activeForm = 6;
        }
      }
    },
    onReset3() {
      this.activeForm = 1;
    },
    onSubmit4() {
      this.$router.replace({path: '/detail/advanced'});
    },
    onReset4() {
      this.formData1 = {...INITIAL_DATA1};
      this.formData2 = {...INITIAL_DATA2};
      this.formData3 = {...INITIAL_DATA3};
      this.pic = [];
      this.activeForm = 0;
    },
    onDragenter(p) {
      console.log('dragenter', p);
    },
    onDragleave(p) {
      console.log('dragleave', p);
    },
    onDrop(p) {
      console.log('drop', p);
    },
    onSuccess(context) {
      const dataList = context.response.map(response => response.data);
      // 将 dataList 保存到你需要的地方
      this.formData3.catPictures = dataList.join(',');

      console.log(context.response)
      const state = context.response.map(response => response.state);
      if (state.every(element => element === 200)) {
        this.$message.success('上传成功');
      } else {
        this.$message.error('上传失败');
      }
    },
    async initCatSpecies() {
      try {
        const res = await catApi.getSpeciesList()
        if (res && res.data && Array.isArray(res.data)) {
          // 成功获取到数据并确保数据是一个数组
          this.speciesOptions = res.data.map(cat =>
            // 将 speciesId 替换成 value，将 speciesName 替换成 label
            ({
              value: cat.speciesId,
              label: cat.speciesName
            })
          )
        } else {
          // 如果数据不是一个数组，抛出异常
          throw new Error('Invalid species list data')
        }
      } catch (err) {
        // 异常处理
        console.error('Failed to initialize cat species:', err)
        // 在这里你可以在页面上展示一个错误提示
      }
    },
    async initOwnerType() {
      try {
        const res = await catApi.getOwnerList()
        if (res && res.data && Array.isArray(res.data)) {
          // 成功获取到数据并确保数据是一个数组
          this.ownerOptions = res.data.map(owner =>
            // 将 speciesId 替换成 value，将 speciesName 替换成 label
            ({
              value: owner.ownerTypeId,
              label: owner.ownerTypeName
            })
          )
        } else {
          // 如果数据不是一个数组，抛出异常
          throw new Error('Invalid species list data')
        }
      } catch (err) {
        // 异常处理
        console.error('Failed to initialize cat species:', err)
        // 在这里你可以在页面上展示一个错误提示
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
