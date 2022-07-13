import YlDroptree from "./components/droptree";

const components = [YlDroptree];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export { install, YlDroptree };
