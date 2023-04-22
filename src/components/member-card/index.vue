<template>
  <t-card theme="poster2" :bordered="false">
    <template #avatar>
      <t-avatar size="56px">
        <template #icon>
          {{ member.nickname.charAt(0) }}
        </template>
      </t-avatar>
    </template>
    <template #status>
      <t-tag :theme="member.enable == 1 ? 'success' : 'default'" :disabled="!member.enable">{{
          member.enable == 1 ? '已启用' : '已停用'
        }}
      </t-tag>
    </template>
    <template #content>
      <p class="list-card-item_detail--name">{{ member.nickname }}</p>
      <p class="list-card-item_detail--desc">入职时间：{{ member.gmtCreate || '2019-7-11' }}<br>
        员工权限：{{ member.permissionName }}<br>
<!--        员工编号：{{ member.adminId }}-->
      </p>
    </template>
    <template #footer>
      <t-avatar-group cascading="left-up" :max="2">
        <t-avatar>{{ typeMap[Math.floor(Math.random() * typeMap.length)] }}</t-avatar>
        <t-avatar
        >
          <template #icon>
            <add-icon/>
          </template>
        </t-avatar>
      </t-avatar-group>
    </template>
    <template #actions>
      <t-dropdown
        :disabled="member.enable == 0 || member.adminId == 1"
        trigger="click"
        :options="[
          {
            content: '管理',
            value: 'manage',
            onClick: () => handleManagemember(member),
          },
          {
            content: '开除',
            value: 'delete',
            onClick: () => handleDeleteItem(member),
          },
        ]"
      >
        <t-button theme="default" :disabled="member.enable == 0  || member.adminId == 1" shape="square" variant="text">
          <more-icon/>
        </t-button>
      </t-dropdown>
    </template>
  </t-card>
</template>
<script lang="ts">
import {ShopIcon, CalendarIcon, ServiceIcon, UserAvatarIcon, LaptopIcon, MoreIcon, AddIcon} from 'tdesign-icons-vue';

export default {
  name: 'ListCard',
  components: {
    ShopIcon,
    CalendarIcon,
    ServiceIcon,
    UserAvatarIcon,
    LaptopIcon,
    MoreIcon,
    AddIcon,
  },
  props: {
    member: {
      type: Object,
    },
  },
  data() {
    return {
      typeMap: ['A', 'B', 'C', 'D', 'E'],
      firstNickname: '',
    };
  },
  mounted() {
    this.spliceNickname(this.member)
  },
  methods: {
    handleManagemember(member) {
      this.$emit('manage-product', member);
    },
    handleDeleteItem(member) {
      this.$emit('delete-item', member);
    },
    spliceNickname(member) {
      this.firstNickname = member.nickname[0]
    }
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables';

.list-card-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &_detail {
    min-height: 140px;

    &--name {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 400;
      color: var(--td-text-color-primary);
    }

    &--desc {
      color: var(--td-text-color-secondary);
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 40px;
    }
  }
}
</style>
