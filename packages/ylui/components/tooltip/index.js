import YlTooltip from "./src/Tooltip.vue";

YlTooltip.install = function (Vue) {
  Vue.component(YlTooltip.name, YlTooltip);
};

export default YlTooltip;
