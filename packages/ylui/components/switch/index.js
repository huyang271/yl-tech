import YlSwitch from "./src/Switch.vue";

YlSwitch.install = function (Vue) {
  Vue.component(YlSwitch.name, YlSwitch);
};

export default YlSwitch;
