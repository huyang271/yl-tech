<template>
  <el-dialog
    ref="elInstance"
    v-bind="$attrs"
    v-on="$listeners"
    :custom-class="`yl-dialog ${customClass}`"
  >
    <template slot="title">
      <slot name="title">{{ title }}</slot>
    </template>
    <slot>更多</slot>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script>
import { Dialog } from "element-ui";

export default {
  name: "YlDialog",
  components: {
    ElDialog: Dialog,
  },
  props: {
    title: String,
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.el-dialog.yl-dialog {
  border-radius: 8px;
}
</style>
