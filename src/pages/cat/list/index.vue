<template>
  <div>
    猫咪列表
    <t-button @click="test">获取用户信息</t-button>
  </div>
</template>

<script>
import ssoApi from "@/constants/api/imiao-sso/imiao-sso-api";

export default {
  name: "index",
  data() {
    return {}
  },
  methods: {
    async test() {
      const userDetail = await ssoApi.userDetail();
      console.log(userDetail)
    }
  }
}
</script>

<style scoped>

</style>
