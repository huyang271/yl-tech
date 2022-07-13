<template>
  <div class="yl-input">
    <el-input ref="elInstance" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
      <template slot="prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <slot name="suffix"></slot>
      </template>
    </el-input>
  </div>
</template>

<script>
import { Input } from "element-ui";

export default {
  name: "YlInput",
  components: {
    ElInput: Input,
  },
};
</script>

<style lang="scss" scoped></style>
