<template>
  <div>
    <div class="qrcode-container">
      <qrcode-vue :value="qrcode || '请选择金额'" :size="200" :bgColor="'#0ff'" :fgColor="'#f00'"/>
    </div>
    <t-space break-line>
      <t-button :size="size" @click="selectAmount(10)">¥10</t-button>
      <t-button :size="size" @click="selectAmount(50)">¥50</t-button>
      <t-button :size="size" @click="selectAmount(100)">¥100</t-button>
      <t-button :size="size" @click="selectAmount(1000)">¥1000</t-button>
      <t-button :size="size" @click="selectAmount(1500)">¥1500</t-button>
      <div class="balance-input">

      </div>
    </t-space>
  </div>

</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "index",
  components: {
    QrcodeVue
  },
  data() {
    return {
      size: "large",
      balance: 0,
      qrcode: ""
    }
  },
  methods: {
    selectAmount(amount) {
      const url = amount.toString()
      // 生成二维码
      this.qrcode = url
      this.$emit('qrcode-updated', this.qrcode)
    }
  }
}
</script>

<style lang="less" scoped>
.qrcode-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.balance-input {
  width: 100%;
}
</style>
