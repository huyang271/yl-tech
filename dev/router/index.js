import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dropdown",
    name: "dropdown",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ui-demo/YlDropdown.vue"),
  },
  {
    path: "/tooltip",
    name: "tooltip",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ui-demo/YlTooltip.vue"),
  },
  {
    path: "/popover",
    name: "popover",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ui-demo/YlPopover.vue"),
  },
  {
    path: "/button",
    name: "button",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ui-demo/YlButton.vue"),
  },
  // {
  //   path: "/cascader",
  //   name: "cascader",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/ui-demo/YlCascader.vue"),
  // },
  // {
  //   path: "/toast",
  //   name: "toast",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/ui-demo/YlToast.vue"),
  // },
  {
    path: "/dialog",
    name: "dialog",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ui-demo/YlDialog.vue"),
  },
  // {
  //   path: "/form",
  //   name: "form",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "about" */ "../views/ui-demo/YlFormComponents.vue"
  //     ),
  // },
  // {
  //   path: "/tree",
  //   name: "tree",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/ui-demo/YlTree.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
