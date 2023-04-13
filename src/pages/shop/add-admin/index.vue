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
          <div class="form-basic-container-title">新增店员</div>
          <!-- 表单内容 -->

          <!-- 合同名称,合同类型 -->
          <t-row class="row-gap" :gutter="[16, 24]">
            <t-col :span="6">
              <t-form-item label="用户名" name="username">
                <t-input v-model="formData.username" :style="{ width: '322px' }" placeholder="请输入内容" />
              </t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item label="权限类型" name="permissionId">
                <t-select
                  v-model="formData.permissionId"
                  :style="{ width: '322px' }"
                  placeholder="请选择类型"
                  class="demo-select-base"
                  clearable
                >
                  <t-option v-for="(item, index) in permissionOptions" :key="index" :value="item.permissionId" :label="item.name">
                    {{ item.name }}
                  </t-option>
                </t-select>
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="密码" name="password">
                <t-input v-model="formData.password" :style="{ width: '322px' }" placeholder="请输入内容" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="姓名" name="nickname">
                <t-input v-model="formData.nickname" :style="{ width: '322px' }" placeholder="请输入内容" />
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="手机号" name="phone">
                <t-input v-model="formData.phone" :style="{ width: '322px' }" placeholder="请输入内容" />
              </t-form-item>
            </t-col>



          </t-row>

          <div class="form-basic-container-title form-title-gap">其它信息</div>

          <t-form-item label="备注" name="comment">
            <t-textarea v-model="formData.comment" :height="124" placeholder="请输入备注" />
          </t-form-item>
        </div>
      </div>

      <div class="form-submit-container">
        <div class="form-submit-sub">
          <div class="form-submit-left">
            <t-button theme="primary" class="form-submit-confirm" type="submit"> 提交 </t-button>
            <t-button type="reset" class="form-submit-cancel" theme="default" variant="base"> 取消 </t-button>
          </div>
        </div>
      </div>
    </t-form>
  </t-card>
</template>
<script>
import { prefix } from '@/config/global';
import custApi from "@/constants/api/imiao-cust/imiao-cust-api";

const INITIAL_DATA = {
  username: '',
  password: '',
  phone: '',
  nickname: '',
  permissionId: '',
};
const FORM_RULES = {
  username: [{ required: true, message: '请输入用户名', type: 'error' }],
  password: [{ required: true, message: '请输入密码', type: 'error' }],
  permissionId: [{ required: true, message: '请选择权限', type: 'error' }],
  nickname: [{ required: true, message: '请输入姓名', type: 'error' }],
  phone: [{ required: true, message: '请输入手机号', type: 'error' }],
};

export default {
  name: 'FormBase',
  data() {
    return {
      prefix,
      stepSuccess: true,
      formData: { ...INITIAL_DATA },
      FORM_RULES,
      permissionOptions:[
        { label: '超管', value: '1' },
        { label: '普通', value: '2' },
        { label: '类型C', value: '3' },
      ],
      textareaValue: '',
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
        const res = await custApi.adminAddNew(this.formData)
        if (res.state === 200){
          this.$message.success('新建成功！')
          this.formData = { ...INITIAL_DATA };
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
