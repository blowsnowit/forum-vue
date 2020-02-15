<template>
  <div class="admin-menu">
    <el-menu :default-active="$route.path"
             class="el-menu-admin"
             @select="selectMenu"
             background-color="var(--skin)"
             text-color="var(--skin-font)"
             active-text-color="var(--skin-font-active)"
             router
             :collapse="collapse">
      <el-menu-item v-for="(menu,index) in menus" :index="menu.path" :route="menu.path" :key=" index">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.label}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "AdminMenu",
    props:{
      collapse:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        menus: [
          {label: "首页",icon: "el-icon-s-home",path: "/admin"},
          {label: "用户列表",icon: "el-icon-user",path: "/admin/user"},
          {label: "文章列表",icon: "el-icon-notebook-2",path: "/admin/article"},
          {label: "评论列表",icon: "el-icon-chat-line-round",path: "/admin/comment"},
          {label: "话题列表",icon: "el-icon-collection-tag",path: "/admin/topic"},
          {label: "标签列表",icon: "el-icon-price-tag",path: "/admin/tag"},
          {label: "站点设置",icon: "el-icon-setting",path: "/admin/set"},
        ]
      }
    },
    methods: {
      selectMenu() {
        this.$emit("select");
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .admin-menu {
    .el-menu-admin{
      height: 100vh;
      li.el-menu-item:hover {
        background: var(--gray)!important;
      }
    }
    .el-menu-admin.el-menu--collapse.el-menu {
      width: 64px;
    }
    .el-menu-admin.el-menu {
      width: 200px;
    }
  }
</style>
