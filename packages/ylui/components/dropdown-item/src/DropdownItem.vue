<template>
  <el-dropdown-item ref="elInstance" v-bind="$attrs" v-on="$listeners">
    <div class="item-wrapper">
      <slot name="left"></slot>
      <slot></slot>
      <slot name="right"></slot>
    </div>
  </el-dropdown-item>
</template>

<script>
import { DropdownItem } from "element-ui";

export default {
  name: "YlDropdownItem",
  components: {
    ElDropdownItem: DropdownItem,
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
  &__item {
    min-width: 160px;
    height: 36px;
    // line-height: 36px;
    font-size: 14px;
    font-weight: 400;
    color: #242529;
    padding: 0 8px;
    margin: 4px;
    &:not(.is-disabled):hover {
      background-color: #f5f5f7;
      color: #242529;
      border-radius: 4px;
    }
    .item-wrapper {
      display: flex;
      align-items: center;
    }

    &--divided::before {
      content: "";
      height: 0px;
      margin: 0;
    }
  }
  .is-disabled {
    cursor: default;
    color: #bbb;
    pointer-events: none;
  }
}
</style>
