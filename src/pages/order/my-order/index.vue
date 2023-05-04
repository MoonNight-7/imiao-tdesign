<template>
  <t-card :bordered="false">
    <common-table />
  </t-card>
</template>

<script>
import CommonTable from "@/pages/order/components/CommonTable.vue";

export default {
  name: "index",
  components: {CommonTable}
}
</script>

<style scoped>

</style>
