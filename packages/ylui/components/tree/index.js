import YlTree from "./src/Tree.vue";

YlTree.install = function (Vue) {
  Vue.component(YlTree.name, YlTree);
};

export default YlTree;
