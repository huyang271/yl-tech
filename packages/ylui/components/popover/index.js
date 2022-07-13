import YlPopover from "./src/Popover.vue";

YlPopover.install = function (Vue) {
  Vue.component(YlPopover.name, YlPopover);
};

export default YlPopover;
