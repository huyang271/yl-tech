import YlButton from "./src/Button.vue";

YlButton.install = function (Vue) {
  Vue.component(YlButton.name, YlButton);
};

export default YlButton;
