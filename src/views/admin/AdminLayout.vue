<template>
  <div class="admin-layout" :class="isMobile?'mobile-mode':'pc-mode'">
    <div>
      <template v-if="isMobile">
        <el-drawer
          size="40%"
          :visible.sync="collapse"
          direction="ltr"
          append-to-body
          :withHeader="false"
          :show-close="false">
          <admin-menu :collapse="!collapse" @select="collapse = !collapse"></admin-menu>
        </el-drawer>
      </template>
      <template v-else>
        <admin-menu :collapse="collapse"></admin-menu>
      </template>
    </div>
    <div class="admin-layout-right">
      <header class="admin-header">
        <template v-if="collapse">
          <i class="el-icon-s-unfold" @click="collapse = !collapse"></i>
        </template>
        <template v-else>
          <i class="el-icon-s-fold" @click="collapse = !collapse"></i>
        </template>
      </header>
      <main>
        <router-view/>
      </main>
      <footer>
        Powered by blowsnow
      </footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminMenu from "./components/AdminMenu";
  export default {
    name: "AdminLayout",
    components: {AdminMenu},
    data() {
      return {
        collapse: false
      }
    },
    computed:{
      isMobile(){
        return this.$store.getters['getIsMobile'];
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.admin-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  .admin-layout-right{
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    > header.admin-header{
      font-size: 20px;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid var(--gray-dark);
    }
    > main{
      flex: 1;
      // background: var(--gray-dark);
      overflow: auto;
    }
    > footer{
      padding: 20px;
      text-align: center;

      border-top: 1px solid var(--gray-dark);
    }
  }

}
</style>
