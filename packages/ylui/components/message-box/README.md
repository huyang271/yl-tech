### 补充：
拓展支持第三个按钮，配置项如下：
```
showOtherButton: false, // 是否显示第3个按钮
otherButtonText: "", // 第3个按钮文本
otherButtonClass: "", // 第3个按钮class
```
按钮点击回调：
```
this.$dialog("此操作将永久删除该文件, 是否继续?", "提示", {
  confirmButtonText: "确定",
  cancelButtonText: "取消",
  showOtherButton: true,
  otherButtonText: "其他操作按钮",
  otherButtonClass: "other-btn",
  type: "info",
})
  .then((type) => {
    console.log("用于区分confirm/other按钮的: ", type);
    this.$message({
      type: "success",
      message: "删除成功!",
    });
  })
  .catch(() => {
    this.$message({
      type: "info",
      message: "已取消删除",
    });
  });
```