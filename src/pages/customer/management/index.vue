<template>
  <t-card :bordered="false">
    <common-table />
  </t-card>
</template>
<script lang="ts">
import CommonTable from '../components/CommonTable.vue';

export default {
  name: 'CustomerManagement',
  components: {
    CommonTable,
  },
};
</script>
