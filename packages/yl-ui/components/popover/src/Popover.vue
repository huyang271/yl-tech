<template>
  <div class="yl-popover">
    <el-popover ref="elInstance" v-bind="$attrs" v-on="$listeners">
      <slot>更多</slot>
      <template slot="reference">
        <slot name="reference"></slot>
      </template>
    </el-popover>
  </div>
</template>

<script>
import { Popover } from "element-ui";

export default {
  name: "YlPopover",
  components: {
    ElPopover: Popover,
  },
};
</script>

<style lang="scss" scoped></style>
