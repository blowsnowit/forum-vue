<template>
  <div class="home-header">
    <!--LOGO-->
    <div class="left-box">
      <template v-if="isMobile">
        <i class="el-icon-menu" @click="drawer = true"></i>
        <el-drawer
          title="我是标题"
          :modal="false"
          :visible.sync="drawer"
          direction="ltr"
          size="60%"
          :with-header="false">
          <home-menu />
        </el-drawer>
      </template>
      <template v-else>
        <home-menu />
      </template>
    </div>
    <ul class="right-box">
      <li @click="showInputSearch">
        <i  v-show="!isShowSearch" class="el-icon-search"></i>
        <el-input ref="searchInput" v-show="isShowSearch" size="mini" v-model="searchWord"
                  prefix-icon="el-icon-search" @blur="searchInputBlur"
                  :autofocus="true"
                  placeholder="搜索如此简单" class="my-el-input search-input" :class="{'animation':isSearchAnimation}"
                  @keyup.enter.native="onSearch"></el-input>
      </li>
      <li>
        <el-dropdown @command="onUserCommand">
          <i class="el-icon-user"></i>
          <el-dropdown-menu slot="dropdown" style="width: 150px;">
            <template v-if="isLogin">
              <el-dropdown-item icon="el-icon-user" command="goUserInfo">我的资料</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting" command="goUserInfoSetting">个人设置</el-dropdown-item>
              <el-dropdown-item divided icon="el-icon-switch-button" command="logout">登出</el-dropdown-item>
            </template>
            <template v-else>
              <el-dropdown-item icon="el-icon-user" command="login">登录</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting" command="register">注册</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
        <el-popover
          popper-class=""
          ref="popover"
          placement="bottom-end"
          :visible-arrow="false"
          trigger="hover">
          <ul>
            <li>我的资料</li>
            <li>个人设置</li>
            <li><el-divider /></li>
            <li>登出</li>
          </ul>
        </el-popover>
      </li>
      <login-dialog ref="loginDialog"></login-dialog>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeMenu from "./HomeMenu";
  import LoginDialog from "../dialog/LoginDialog";
  export default {
    name: "HomeHeader",
    components: {LoginDialog, HomeMenu},
    data() {
      return {
        isMobile: false,
        drawer: false,

        isShowSearch: false,
        isSearchAnimation: false,
        searchWord: null,

      }
    },
    computed:{
      isLogin(){
        return this.$store.getters['User/getIsLogin'];
      }
    },
    watch:{
      '$route.fullPath'(){
        console.log("watch route.fullPath");
        this.checkLogin();
      }
    },
    mounted(){
      this.checkLogin();
    },
    methods: {
      showInputSearch() {
        this.isSearchAnimation = true;
        this.isShowSearch = true;
        this.$nextTick(()=>{
          this.$refs.searchInput.focus();
        })
      },
      searchInputBlur() {
        this.isSearchAnimation = false;

        setTimeout(()=>{
          this.isShowSearch = false;
        },200)
      },

      /**
       * 检查是否需要登录
       */
      checkLogin(){
        if (this.$route.query.needlogin && !this.$store.getters['User/getIsLogin']){
          this.openLoginDialog();
        }
      },
      /**
       * 响应command
       * @param command
       */
      onUserCommand(command){
        if (command === "login"){
          this.openLoginDialog();
        }
        if (command === "logout"){
          this._logout();
        }
        if (command === "goUserInfo"){
          this.$router.push({
            path: "/user/"
          })
        }
        if (command === "goUserInfoSetting"){
          this.$router.push({
            path: "/user/",
            query:{
              type: "setting"
            }
          })
        }

      },
      /**
       * 搜索文章
       */
      onSearch(){
        this.$store.commit('Article/SET_SEARCH',this.searchWord);
      },

      _logout(){
        this.$store.commit("User/LOGOUT");
        this.$router.push({
          path: "/"
        })
      },
      openLoginDialog(){
        this.$refs.loginDialog.open();
      },

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--skin-font);
  height: 50px;
  .home-menu{
    display: flex;
    align-items: center;
    .logo-box{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title{
      font-size: 20px;
    }
  }
  .menu-box,.right-box{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    li{
      padding: 0 20px;
      cursor: pointer;
    }
  }
  .menu-box{
    margin: 0 20px;
  }

  .right-box{
    height: 50px;
    li{
      line-height: 50px;
    }
    .search-input{
      transition: width 0.3s;
      width: 0;
    }
    .search-input.animation{
      width: 200px;
    }
  }
}

.home-manager.mobile .home-header{
  .el-drawer__body{
    background: var(--skin);
  }
  .home-menu{
    display: block;
    .logo-box{
      padding: 20px;
    }
    .menu-box{
      flex-direction: column;
      li{
        padding 10px;
        text-align: center;
      }
    }
  }

}


.popover-search{
  padding: 0;
  input{
    border: unset;
  }
}
</style>
