<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    console.log(this);
  }
}
</script>

<style>
</style>
