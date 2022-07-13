import YlOptionGroup from "./src/OptionGroup.vue";

YlOptionGroup.install = function (Vue) {
  Vue.component(YlOptionGroup.name, YlOptionGroup);
};

export default YlOptionGroup;
