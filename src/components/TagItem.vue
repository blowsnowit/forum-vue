<template>
  <span class="tag-item" @click="goTag">
    <i class="el-icon-price-tag">{{name}}</i>
  </span>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "TagItem",
    props:{
      name: String,
      go:{
        type: Boolean,
        default: true
      },
    },
    methods: {
      goTag() {
        if (!this.go) return;
        this.$router.push({
          path: '/tag/' + this.name
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tag-item {
  margin-right: 5px;
  font-size: 13px;
}
</style>
