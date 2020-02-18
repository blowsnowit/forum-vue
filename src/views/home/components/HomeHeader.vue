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
          <home-menu @call="drawer = false"/>
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
      <li v-if="isLogin">
        <notify>
          <i slot="reference" class="el-icon-bell"></i>
        </notify>
      </li>
      <li>
        <el-dropdown @command="onUserCommand" style="display: flex;align-items: center;height: 100%;">
          <template v-if="isLogin">
            <el-avatar :size="30" :src="userInfo.userFace"></el-avatar>
          </template>
          <template v-else>
            <i style="color: var(--skin-font);font-size: 16px;" class="el-icon-user"></i>
          </template>

          <el-dropdown-menu slot="dropdown" style="width: 150px;">
            <template v-if="isLogin">
              <el-dropdown-item icon="el-icon-user" command="goUserInfo">我的资料</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting" command="goUserInfoSetting">个人设置</el-dropdown-item>
              <el-dropdown-item v-if="userInfo.userOp === 1" divided icon="el-icon-s-home" command="admin">后台</el-dropdown-item>
              <el-dropdown-item divided icon="el-icon-switch-button" command="logout">登出</el-dropdown-item>
            </template>
            <template v-else>
              <el-dropdown-item icon="el-icon-user" command="login">登录</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting" command="register">注册</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <login-dialog ref="loginDialog"></login-dialog>
      <register-dialog ref="registerDialog"></register-dialog>
      <find-dialog ref="findDialog"></find-dialog>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeMenu from "./HomeMenu";
  import LoginDialog from "../dialog/LoginDialog";
  import RegisterDialog from "../dialog/RegisterDialog";
  import FindDialog from "../dialog/FindDialog";
  import Notify from "./Notify";
  export default {
    name: "HomeHeader",
    components: {Notify, FindDialog, RegisterDialog, LoginDialog, HomeMenu},
    data() {
      return {
        drawer: false,

        isShowSearch: false,
        isSearchAnimation: false,
        searchWord: null,

      }
    },
    computed:{
      isLogin(){
        return this.$store.getters['User/getIsLogin'];
      },
      userInfo(){
        return this.$store.getters['User/getUserInfo'];
      },
      isMobile(){
        return this.$store.getters.getIsMobile;
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
        if (command === "register"){
          this.openRegisterDialog();
        }

        if (command === "logout"){
          this._logout();
        }
        if (command === "goUserInfo"){
          this.$router.push({
            path: "/user/" + this.$store.getters['User/getUserInfo'].userId
          })
        }
        if (command === "admin"){
          this.$router.push({
            path: "/admin/"
          })
        }
        if (command === "goUserInfoSetting"){
          this.$router.push({
            path: "/user/"  + this.$store.getters['User/getUserInfo'].userId,
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
        this.$router.push({
          path: "/search/" + this.searchWord
        })
      },
      _logout(){
        this.$store.commit("User/LOGOUT");
        this._refreshPage();
      },

      /**
       * 打开登录弹窗
       */
      openLoginDialog(){
        this.$refs.loginDialog.open();
      },
      /**
       * 打开注册窗口
       */
      openRegisterDialog(){
        this.$refs.registerDialog.open();
      },
      /**
       * 打开找回密码弹窗
       */
      openFindDialog(){
        this.$refs.findDialog.open();
      }
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
    > li{
      padding: 0 20px;
      cursor: pointer;
    }
  }
  .menu-box{
    margin: 0 20px;
  }

  .right-box{
    height: 50px;
    > li{
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
