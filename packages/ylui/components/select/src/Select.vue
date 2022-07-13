<template>
  <div class="yl-select">
    <el-select ref="elInstance" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </el-select>
  </div>
</template>

<script>
import { Select } from "element-ui";

export default {
  name: "YlSelect",
  components: {
    ElSelect: Select,
  },
};
</script>

<style lang="scss" scoped>
.yl-select {
  display: inline-block;
}
</style>
