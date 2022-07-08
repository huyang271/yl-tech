<template>
  <div>
    <yl-button :plain="true" @click="open1">消息</yl-button>
    <yl-button :plain="true" @click="open2">成功</yl-button>
    <yl-button :plain="true" @click="open3">警告</yl-button>
    <yl-button :plain="true" @click="open4">错误</yl-button>

    <yl-button :plain="true" @click="open5">单独引用</yl-button>
  </div>
</template>

<script>
import { Message } from "@/components/yl-ui";

export default {
  methods: {
    open1() {
      this.$toast({
        showClose: true,
        message: "这是一条消息提示",
      });
    },

    open2() {
      this.$toast({
        showClose: true,
        message: "恭喜你，这是一条成功消息",
        type: "success",
      });
    },

    open3() {
      this.$toast({
        showClose: true,
        message: "警告哦，这是一条警告消息",
        type: "warning",
      });
    },

    open4() {
      this.$toast({
        showClose: true,
        message: "错了哦，这是一条错误消息",
        type: "error",
      });
    },

    open5() {
      Message.success("你好！成功了");
    },
  },
};
</script>

<style></style>
