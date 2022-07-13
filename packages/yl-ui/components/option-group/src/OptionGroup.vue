<template>
  <el-option-group ref="elInstance" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-option-group>
</template>

<script>
import { OptionGroup } from "element-ui";

export default {
  name: "YlOptionGroup",
  components: {
    ElOptionGroup: OptionGroup,
  },
};
</script>

<style lang="scss" scoped></style>
