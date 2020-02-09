<template>
  <div id="app">
    <router-view :key="active"/>
  </div>
</template>

<script>
  import Vue from 'vue'
export default {
  name: 'app',
  computed:{
    active(){
      return this.$store.getters.getActive;
    }
  },
  mounted(){
    Vue.prototype._refreshPage = ()=>{
      this.$store.commit("ADD_ACTIVE");
    }
  },
}
</script>

<style>
</style>
