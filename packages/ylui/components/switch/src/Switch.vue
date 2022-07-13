<template>
  <div class="yl-switch">
    <el-switch
      ref="elInstance"
      v-bind="$attrs"
      v-on="$listeners"
      :width="width"
    >
      <slot></slot>
    </el-switch>
  </div>
</template>

<script>
import { Switch } from "element-ui";

export default {
  props: {
    width: {
      type: Number,
      default: 32,
    },
  },
  name: "YlSwitch",
  components: {
    ElSwitch: Switch,
  },
};
</script>

<style lang="scss" scoped>
.yl-switch {
  display: inline-block;
}
</style>
