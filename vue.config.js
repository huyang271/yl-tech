const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = defineConfig({
  pages: {
    index: {
      entry: "dev/main.js",
    },
  },
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias.set("@", resolve("dev/"));
  },
});
