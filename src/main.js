import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import * as YlUI from "../packages/ylui";
// import "../packages/ylui/components/base/style/index.scss";
import * as YlUI from "../dist/yl-ui.umd.js";
import "../dist/yl-ui.css";

console.log(YlUI);
debugger;

Vue.config.productionTip = false;
Vue.use(YlUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
