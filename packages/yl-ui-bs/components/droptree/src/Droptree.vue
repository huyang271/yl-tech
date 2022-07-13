<template>
  <yl-popover
    trigger="click"
    @show="popTrigger(true)"
    @hide="popTrigger(false)"
    :visible-arrow="visibleArrow"
    class="yl-droptree"
    :popper-class="`yl-droptree-popper yl-droptree-${uuid} ${popperClass}`"
  >
    <div
      ref="wrapper"
      slot="reference"
      :class="`el-select yl-droptree-select yl-droptree-select-${uuid} no-outline`"
      :style="`width: ${width}`"
      @mouseenter="handleDropdown"
      @mouseleave="showDropdown = true"
    >
      <div
        :class="[
          `yl-droptree__tags-${uuid}`,
          'el-select__tags yl-droptree__tags',
          dark ? 'yl-droptree__tags--dark' : '',
          actived ? 'border-active' : '',
        ]"
      >
        <span v-if="nodeChecked.length">
          <el-tag
            v-for="node in nodeChecked"
            :key="node[nodeKey]"
            size="small"
            closable
            :effect="dark ? 'dark' : 'light'"
            @close="tagClose(node)"
          >
            <yl-tooltip
              v-if="hasTooltip[`tag${node[nodeKey]}`]"
              :content="getText(node)"
              placement="top"
              :effect="dark ? 'light' : 'dark'"
            >
              <div :class="`tag-text-${node[nodeKey]}`">
                {{ getText(node) }}
              </div>
            </yl-tooltip>
            <div v-else :class="`tag-text-${node[nodeKey]}`">
              {{ getText(node) }}
            </div>
          </el-tag>
        </span>
        <div v-else class="placeholder">{{ placeholder }}</div>
      </div>
      <div
        :class="[
          'el-input el-input--suffix yl-droptree__input',
          dark ? 'yl-droptree__input--dark' : '',
        ]"
        style="width: 100%"
        ref="droptreeInput"
      >
        <input
          type="text"
          readonly="readonly"
          autocomplete="off"
          class="el-input__inner no-border"
          :style="`height: ${height}px;`"
        />
        <span v-if="showDropdown" class="el-input__suffix dropdown-icon">
          <span class="el-input__suffix-inner">
            <i
              :class="[
                'el-select__caret el-input__icon',
                actived ? 'el-icon-arrow-down' : 'el-icon-arrow-up',
              ]"
            ></i>
          </span>
        </span>
        <span v-if="nodeChecked.length" class="el-input__suffix clear-icon">
          <span class="el-input__suffix-inner">
            <i
              :class="['el-icon-error el-input__icon']"
              @click.stop="clearTags"
            ></i>
          </span>
        </span>
      </div>
    </div>
    <div class="yl-droptree-tree" :style="`width: ${popperWidth}px`">
      <yl-tree
        ref="tree"
        :data="treeData"
        :default-checked-keys="value"
        :node-key="nodeKey"
        show-checkbox
        :props="props"
        :check-strictly="checkStrictly"
        @check-change="checkChange"
      >
        <template slot-scope="{ node, data }">
          <div class="yl-droptree-tree-node__label">
            <slot :node="node" :data="data">
              {{ node[props.label] }}
            </slot>
          </div>
        </template>
      </yl-tree>
      <!-- <div v-if="actived" class="yl-mask" @click="actived = false"></div> -->
    </div>
  </yl-popover>
</template>

<script>
import { YlTree } from "@yl-tech/yl-ui";
import { Tag } from "element-ui";

let flatData = [];
function getFlatTreeData(data, childField, labelField, parendFullLabel = "") {
  data.forEach((d) => {
    d.fullLabel = `${parendFullLabel}${parendFullLabel ? " / " : ""}${
      d[labelField]
    }`;
    flatData.push(d);
    if (d[childField]?.length) {
      getFlatTreeData(d[childField], childField, labelField, d.fullLabel);
    }
  });
}
function getStyleComputedProperty(element, property) {
  var css = window.getComputedStyle(element, null);
  return css[property];
}
function getScrollParent(element) {
  var parent = element.parentNode;

  if (!parent) {
    return element;
  }

  if (parent === window.document) {
    if (window.document.body.scrollTop || window.document.body.scrollLeft) {
      return window.document.body;
    } else {
      return window.document.documentElement;
    }
  }

  if (
    ["scroll", "auto"].indexOf(getStyleComputedProperty(parent, "overflow")) !==
      -1 ||
    ["scroll", "auto"].indexOf(
      getStyleComputedProperty(parent, "overflow-x")
    ) !== -1 ||
    ["scroll", "auto"].indexOf(
      getStyleComputedProperty(parent, "overflow-y")
    ) !== -1
  ) {
    return parent;
  }
  return getScrollParent(element.parentNode);
}

export default {
  name: "YlDroptree",
  components: {
    YlTree,
    ElTag: Tag,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    treeData: {
      type: Array,
      default: () => [],
    },
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    nodeKey: {
      type: String,
      default: "id",
    },
    props: {
      type: Object,
      default: () => {
        return {
          label: "label",
          children: "children",
        };
      },
    },
    dark: {
      type: Boolean,
      default: false,
    },
    showAllLevels: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    width: {
      type: String,
      default: "260px",
    },
    visibleArrow: {
      type: Boolean,
      default: false,
    },
    popperClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      actived: false, // popover是否弹出
      nodeChecked: [],
      height: 32,
      popperWidth: 260,
      uuid: Math.ceil(Math.random().toFixed(5) * 100000),
      showDropdown: true,
      hasTooltip: {},
    };
  },
  mounted() {
    getFlatTreeData(this.treeData, this.props.children, this.props.label);

    if (this.value.length) {
      this.nodeChecked = this.getCheckedNodes();
      this.$nextTick(() => {
        this.setPopperPosition();
        this.nodeChecked.forEach(this.setTagTooltip);
      });
    }

    // window.addEventListener("scroll", () => {
    //   document.querySelector(`.yl-droptree-${this.uuid}`).style.marginTop =
    //     8";
    // });
  },
  watch: {
    value() {
      this.nodeChecked = this.getCheckedNodes();
      this.$nextTick(() => {
        this.setPopperPosition();
        this.nodeChecked.forEach(this.setTagTooltip);
      });
    },
  },
  methods: {
    getCheckedNodes() {
      return this.$refs.tree.$refs.elInstance.getCheckedNodes(
        !this.checkStrictly
      ); // 是否只包含叶子节点
    },
    checkChange(node, isChecked) {
      this.nodeChecked = this.getCheckedNodes();
      const keys = this.nodeChecked.map((node) => node[this.nodeKey]);

      this.$nextTick(() => {
        if (isChecked) {
          this.nodeChecked.length && this.setPopperPosition();
          this.setTagTooltip(node);
        } else {
          setTimeout(() => {
            this.nodeChecked.length && this.setPopperPosition();
          }, 500);
        }
      });

      this.$emit("input", keys);
    },
    tagClose(tag) {
      this.$refs.tree.$refs.elInstance.setChecked(tag[this.nodeKey], false);
      // 这里是为了等待element关闭动画完成，需从tag组件上优化掉
      setTimeout(() => {
        this.setPopperPosition();
      }, 500);
      this.checkChange();
    },
    setTagTooltip(node) {
      const tagTextLength = document.querySelector(
        `.tag-text-${node[this.nodeKey]}`
      )?.offsetWidth;

      this.hasTooltip[`tag${node[this.nodeKey]}`] = tagTextLength > 140;
    },
    clearTags() {
      this.nodeChecked = [];
      this.height = 36;
      this.$refs.tree.$refs.elInstance.setCheckedKeys([]);
      this.$refs.droptreeInput.click();
      this.$emit("input", []);
    },
    setPopperPosition() {
      const tagsHeight = document.querySelector(
        `.yl-droptree__tags-${this.uuid}`
      ).offsetHeight;

      this.height = tagsHeight;
      // 目前为手动计算有bug
      // 方案：重写element popper设置位置方案，递归获取scroll的元素（document）
      //      要充分考量x-placement位置问题 - -
      document.querySelector(`.yl-droptree-${this.uuid}`).style.marginTop =
        this.height - 24 + "px";
    },
    popTrigger(status) {
      if (status) {
        this.popperWidth = this.$refs.wrapper.offsetWidth - 10;
        const el = getScrollParent(document.querySelector(".yl-droptree"));
        el.addEventListener("scroll", () => {
          document.querySelector(`.yl-droptree-${this.uuid}`).style.marginTop =
            "8px";
        });
      }
      this.actived = status;

      document.querySelector(`.yl-droptree-${this.uuid}`).style.marginTop =
        "8px";
    },
    getText(node) {
      if (this.showAllLevels) {
        return this.getFullLabel(node);
      }
      return node[this.props.label];
    },
    getFullLabel(node) {
      const currentNode = flatData.find(
        (n) => n[this.nodeKey] === node[this.nodeKey]
      );

      return currentNode.fullLabel;
    },

    handleDropdown() {
      if (this.nodeChecked.length) {
        this.showDropdown = false;
      }
    },
  },
};
</script>

<style lang="scss">
.no-border {
  border: 0;
}
.no-outline {
  outline: none;
}
.yl-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.yl-droptree {
  &-popper {
    min-width: 216px;
    padding: 4px;
    margin-top: 8px;
  }
  &__input {
    width: 240px;

    .el-input__inner {
      background: none;
    }
    .el-input__suffix {
      top: 1px;
      z-index: 1;
      &-inner {
        i.el-select__caret {
          font-size: 16px;
          font-weight: bold;
          color: #8d9099;
        }
        i.el-icon-error {
          font-size: 16px;
        }
      }
    }
    .el-input__suffix.clear-icon {
      top: 0;
      z-index: 1;
    }

    &--dark {
      .clear-icon {
        color: #9094a6;
        &:hover {
          color: #c5c7d4;
        }
      }
    }
  }
  &__tags {
    width: 100%;
    min-height: 38px;
    border: 1.5px solid #dadce1;
    padding: 4px 30px 4px 4px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
    &:hover {
      border: 1.5px solid #b4b7bf;
      cursor: pointer;
    }
    .el-tag {
      background-color: #edeff2;
      margin: 4px;
      min-height: 24px;
      div {
        max-width: 180px;
        color: #242529;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        color: #8d9099;
        font-size: 16px;
      }
    }
    .el-tag__close.el-icon-close {
      background: none;
      top: 0;
      color: #8d9099;
      flex-shrink: 0;
      border-radius: 4px;
      &:hover {
        color: #242529;
        background-color: #dadce1;
      }
    }
    .el-tag--dark {
      background-color: #30323b;
      border: 1px solid #40424d;
      div {
        color: #fff;
      }
      i {
        color: #9094a6;
      }
    }
    .placeholder {
      color: #b4b7bf;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      margin: 0 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &--dark {
      background-color: #272830;
      border: 1.5px solid #30323b;
      &:hover {
        border: 1.5px solid #30323b;
        background-color: #30323b;
        cursor: pointer;
      }
      .el-tag__close.el-icon-close {
        background-color: #30323b;
        top: 0;
        color: #c5c7d4;
        flex-shrink: 0;
        &:hover {
          color: #c5c7d4;
          background-color: #40424d;
        }
      }
      .placeholder {
        color: #9094a6;
        font-size: 14px;
        margin: 0 8px;
      }
    }
  }
  &__tags.border-active {
    border: 1.5px solid #3468fe !important;
  }

  &-tree {
    max-height: 280px;
    overflow: auto;
    &-node__label {
      padding-right: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .el-tree-node__content {
      margin: 2px 0;
      &:hover {
        background-color: #f5f5f7;
      }
    }
    .el-checkbox__inner {
      border-width: 1.5px;
    }
    .el-checkbox__input.is-checked > .el-checkbox__inner {
      background-color: #3468fe;
      border-color: #3468fe;
      width: 16px;
      height: 16px;
      &::after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #ffffff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        position: absolute;
        left: 3px;
        top: 1px;
        width: 5px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
        transform: rotate(45deg) scaleY(1.2);
      }
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      content: "";
      position: absolute;
      display: block;
      background-color: #ffffff;
      height: 2px;
      transform: scale(0.5);
      left: -2px;
      right: 0;
      top: 6px;
      width: 17px;
    }
    .el-checkbox__input .el-checkbox__inner {
      width: 16px;
      height: 16px;
      border-width: 1.5px;
      border-color: #dcdfe6;
      &:hover {
        border-color: #3468fe;
      }
      &:focus {
        border-color: #000;
      }
    }

    .el-tree__empty-block {
      position: relative;
      min-height: 70px;
      text-align: center;
      width: 100%;
      height: 100%;
    }

    &::-webkit-scrollbar {
      display: none;
    }
    &::-webkit-scrollbar-track {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background: #c4c4c4;
    }
  }
}

.clear-icon {
  display: none;
  font-size: 18px;
  font-weight: bold;
  color: #ccced4;
  &:hover {
    color: #b4b7bf;
    cursor: pointer;
    z-index: 2;
  }
}
.yl-droptree-select:hover {
  .clear-icon {
    display: block;
  }
}
</style>
