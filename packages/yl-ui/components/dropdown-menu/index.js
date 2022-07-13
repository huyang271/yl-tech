import YlDropdownMenu from "./src/DropdownMenu.vue";

YlDropdownMenu.install = function (Vue) {
  Vue.component(YlDropdownMenu.name, YlDropdownMenu);
};

export default YlDropdownMenu;
