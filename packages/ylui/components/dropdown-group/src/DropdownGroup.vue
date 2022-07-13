<template>
  <div
    :class="[
      'yl-dropdown--group__name',
      withoutLine ? '' : 'yl-dropdown--withoutLine',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YlDropdownGroup",
  props: {
    withoutLine: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.yl-dropdown {
  &--group {
    &__name {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      font-weight: 400;
      color: #8d9099;
      padding: 0 8px;
      margin: 4px;
    }
  }
  &--withoutLine {
    border-top: 1px solid #edeff2;
  }
}
</style>
