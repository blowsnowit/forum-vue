<template>
  <div class="home-menu">
    <div class="logo-box">
      <img src="@/assets/images/logo.png" alt="">
      <span class="title">论坛系统</span>
    </div>
    <ul class="menu-box">
      <li @click="goPath('/')">首页</li>
      <li @click="goPath('/topic')">话题</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "HomeMenu",
    data() {
      return {
        activeIndex2: '1',
      }
    },
    methods: {
      goPath(path) {
        this.$emit("call");
        this.$router.push({
          path: path
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-menu {
  .my-el-menu{
    background: var(--skin)!important;
    .el-menu-item{
      background: var(--skin)!important;
      color: #fff!important;
    }
    .el-submenu__title{
      background: var(--skin)!important;
      color: #fff!important;
    }
  }

}
.my-home-el-submenu{
  .el-menu,.el-menu-item,.el-submenu__title{
    background: var(--skin)!important;
  }
}
</style>
