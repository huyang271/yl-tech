<template>
  <div style="text-align: center">
    <el-divider>常规</el-divider>

    <yl-button @click="dialogVisible = true">OPEN</yl-button>
    <yl-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div slot="title">标题1</div>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <yl-button @click="dialogVisible = false">取 消</yl-button>
        <yl-button type="primary" @click="dialogVisible = false"
          >确 定</yl-button
        >
      </span>
    </yl-dialog>

    <el-divider>$dialog全局方法</el-divider>

    <yl-button @click="handler">OPEN</yl-button>

    <el-divider>单独引用</el-divider>

    <yl-button @click="handlerWithGlobal">OPEN</yl-button>
  </div>
</template>

<script>
import { MessageBox } from "@pkg/yl-ui";

export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handler() {
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
    },
    handlerWithGlobal() {
      MessageBox.confirm(
        "确定删除这3项文件？删除后，文件将被移至回收站。",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      );
      // this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "error",
      // });
    },
  },
};
</script>

<style lang="scss">
.other-btn > span {
  color: red;
}
</style>
