import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as YlUI from "../packages/yl-ui";
import * as YlUIBs from "../packages/yl-ui-bs";

Vue.config.productionTip = false;
Vue.use(YlUI);
Vue.use(YlUIBs);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
