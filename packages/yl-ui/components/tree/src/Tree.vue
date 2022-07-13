<template>
  <div class="yl-tree">
    <el-tree ref="elInstance" v-bind="$attrs" v-on="$listeners">
      <template slot-scope="{ node, data }">
        <slot :node="node" :data="data">
          <span class="el-tree-node__label">{{ node.label }}</span>
        </slot>
      </template>
    </el-tree>
  </div>
</template>

<script>
import { Tree } from "element-ui";

export default {
  name: "YlTree",
  components: {
    ElTree: Tree,
  },
};
</script>

<style lang="scss">
.yl-tree {
  .el-tree {
    &-node {
      &__content {
        display: flex;
        align-items: center;
        height: 36px;
        color: #242529;
        cursor: pointer;
        border-radius: 4px;
        &:hover {
          background-color: #f5f5f7;
        }
      }
    }
  }
}
</style>
