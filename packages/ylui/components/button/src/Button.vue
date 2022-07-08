<template>
  <div class="yl-button">
    <el-button
      ref="elInstance"
      v-bind="$attrs"
      v-on="$listeners"
      :native-type="nativeType"
    >
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
import { Button } from "element-ui";
export default {
  name: "YlButton",
  components: {
    ElButton: Button,
  },
  props: {
    nativeType: {
      type: String,
      default: "button",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "element-ui/lib/theme-chalk/index.css";

.yl-button {
  display: inline-block;
  & + .yl-button {
    margin-left: 10px;
  }
}
</style>
