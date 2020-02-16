<template>
  <div id="app">
    <router-view :key="active"/>
  </div>
</template>

<script>
  import Vue from 'vue'
export default {
  name: 'app',
  data() {
    return {

    }
  },
  computed:{
    active(){
      return this.$store.getters.getActive;
    }
  },
  mounted(){
    //刷新路由方法
    Vue.prototype._refreshPage = ()=>{
      this.$store.commit("ADD_ACTIVE");
    }

    window.addEventListener("resize",() => {
      let clientWidth = document.body.clientWidth;
      if (clientWidth){
        this.$store.commit("SET_ISMOBILE",clientWidth < 992);
      }

    });
    let clientWidth = document.body.clientWidth;
    this.$store.commit("SET_ISMOBILE",clientWidth < 992);
  },
}
</script>

<style>
</style>
