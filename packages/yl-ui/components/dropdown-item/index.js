import YlDropdownItem from "./src/DropdownItem.vue";

YlDropdownItem.install = function (Vue) {
  Vue.component(YlDropdownItem.name, YlDropdownItem);
};

export default YlDropdownItem;
