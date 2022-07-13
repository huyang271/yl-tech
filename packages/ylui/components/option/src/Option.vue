<template>
  <el-option ref="elInstance" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-option>
</template>

<script>
import { Option } from "element-ui";

export default {
  name: "YlOption",
  components: {
    ElOption: Option,
  },
};
</script>

<style lang="scss" scoped></style>
