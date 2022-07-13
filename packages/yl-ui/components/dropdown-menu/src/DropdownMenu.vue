<template>
  <el-dropdown-menu ref="elInstance" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-dropdown-menu>
</template>

<script>
import { DropdownMenu } from "element-ui";

export default {
  name: "YlDropdownMenu",
  components: {
    ElDropdownMenu: DropdownMenu,
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
  max-height: 350px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 0;
}
</style>
