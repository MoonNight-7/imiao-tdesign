<template>
  <t-card :bordered="false">
    <filter-table/>
  </t-card>
</template>

<script>

import FilterTable from "@/pages/cat/components/FilterTable.vue";

export default {
  name: "index",
  components: {FilterTable},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>
