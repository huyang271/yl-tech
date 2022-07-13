<template>
  <div class="yl-tooltip">
    <el-tooltip
      ref="elInstance"
      v-bind="$attrs"
      v-on="$listeners"
      :effect="effect"
      :content="content"
      :popper-class="`yl-tooltip--popper ${popperClass}`"
    >
      <div slot="content" v-if="!content">
        <slot name="content"></slot>
      </div>
      <slot></slot>
    </el-tooltip>
  </div>
</template>

<script>
import { Tooltip } from "element-ui";

export default {
  name: "YlTooltip",
  components: {
    ElTooltip: Tooltip,
  },
  props: {
    effect: {
      type: String,
      default: "light",
    },
    popperClass: {
      type: String,
    },
    content: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.yl-tooltip {
  display: inline-block;
  &--popper {
    font-size: 14px;
    padding: 8px 12px;
  }
}
.yl-tooltip--popper.el-tooltip__popper.is-light {
  border: 1px solid #fff;
  box-shadow: 0px 0px 12px 0px rgba(171, 171, 171, 0.5);
  .popper__arrow,
  .popper__arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
  &[x-placement^="bottom"],
  &[x-placement^="top"] {
    .popper__arrow,
    .popper__arrow::after {
      border-color: #fff transparent;
    }
  }
  &[x-placement^="left"],
  &[x-placement^="right"] {
    .popper__arrow,
    .popper__arrow::after {
      border-color: transparent #fff;
    }
  }
}
</style>
