<template>
  <div class="home-manager" :class="isMobile ? 'mobile' : 'pc'">
    <header class="layout">
      <home-header />
      <!--<home-menu />-->
    </header>
    <main class="layout" :class="'route-' + route">
      <router-view/>
    </main>
    <footer class="layout">
      <home-footer />
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeHeader from "./components/HomeHeader";
  import HomeMenu from "./components/HomeMenu";
  import HomeFooter from "./components/HomeFooter";
  export default {
    name: "HomeManager",
    components: {HomeFooter, HomeMenu, HomeHeader},
    data() {
      return {
        route: '',
        clientWidth: 0
      }
    },
    computed:{
      isMobile(){
        return this.clientWidth < 768;
      }
    },
    mounted(){
      window.onresize = () => {
        this.clientWidth = document.body.clientWidth;
      }
      this.clientWidth = document.body.clientWidth;
      window.isMobile = this.isMobile;
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.route = to.name;
      });
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-manager {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #e3e3e3;
  .layout{
    padding: 0 10%;
  }
  > header{
    background: var(--skin);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }
  > main{
    flex: 1;
    margin-top: 80px;
    margin-bottom: 40px;
  }
}

.home-manager.mobile{
  .layout{
    padding: 0 3%;
  }
}
</style>
