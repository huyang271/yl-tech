<template>
  <div class="yl-dropdown">
    <el-dropdown ref="elInstance" v-bind="$attrs" v-on="$listeners">
      <slot>更多</slot>
      <template slot="dropdown">
        <slot name="dropdown"></slot>
      </template>
      <!-- <yl-dropdown-menu slot="dropdown">
        <div
          v-for="(item, index) in data"
          :key="item.label"
          :class="['yl-dropdown--group', index !==0 && item.isGroup ? 'yl-dropdown--withoutLine': '']"
        >
          <div
            v-if="item.isGroup"
            class="yl-dropdown--group__name">{{ item.label }}</div>
          <yl-dropdown-item
            v-else
            :command="item.command || item.label"
            :disabled="item.disabled"
            :divided="item.divided"
            :icon="item.icon">
            {{ item.label }}
            <i v-if="item.rightIcon" :class="['yl-dropdown--group__rightIcon iconfont', item.rightIcon]"></i>
          </yl-dropdown-item>
        </div>
        <slot name="bottom"></slot>
      </yl-dropdown-menu> -->
    </el-dropdown>
  </div>
</template>

<script>
// import YlDropdownMenu from "../../dropdown-menu/src/DropdownMenu";
// import YlDropdownItem from "../../dropdown-item/src/DropdownItem";
import { Dropdown } from "element-ui";

export default {
  name: "YlDropdown",
  components: {
    // YlDropdownMenu,
    // YlDropdownItem,
    ElDropdown: Dropdown,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.yl-dropdown {
  &--group {
    &__name {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      font-weight: 400;
      color: #8d9099;
      padding: 0 8px;
      margin: 4px;
    }
    &__rightIcon {
      float: right;
    }
  }
}
</style>
