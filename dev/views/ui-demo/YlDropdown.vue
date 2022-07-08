<template>
  <div>
    <yl-dropdown trigger="click">
      <yl-dropdown-menu slot="dropdown">
        <yl-dropdown-item command="1">
          <i class="icon iconfont iconjianjie"></i>
          上传文件
        </yl-dropdown-item>
        <yl-dropdown-item command="2">
          <i class="icon iconfont iconic_grey_folder"></i>
          上传文件夹
        </yl-dropdown-item>
      </yl-dropdown-menu>
      <el-button class="btn-small btn--blue btn-40">
        上传 <i class="iconfont iconfanhui_fanhui icon-size"></i>
      </el-button>
    </yl-dropdown>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
