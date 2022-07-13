import YlDialog from "./src/Dialog.vue";

YlDialog.install = function (Vue) {
  Vue.component(YlDialog.name, YlDialog);
};

export default YlDialog;
