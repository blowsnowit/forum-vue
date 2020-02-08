<template>
  <span class="topic-item" :class="type" @click="goTopic">
    #{{name}}#
  </span>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "TopicItem",
    props:{
      name: String,
      go:{
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "default"
      }
    },
    methods: {
      goTopic() {
        if (!this.go) return;
        this.$router.push({
          path: '/topic/' + this.name
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.topic-item {
  cursor: pointer;
  padding: 0 5px;
  display: inline-block;
}
.topic-item.none{
  background: #fff;
  color: #000;
}
.topic-item.default{
  background: var(--skin-info);
  color: var(--skin-font);
}
.topic-item.skin{
  background: var(--skin);
  color: var(--skin-font);
}
.topic-item{
  /*margin: 0 10px 0 0;*/
}
</style>
