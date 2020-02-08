<template>
  <div class="List">
    <li v-for="i in datas" class="item">{{i}}</li>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "List",
    props: {
      datas: {
        type: Array,
        default: ()=>[]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .List {

  }
</style>
