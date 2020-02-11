<template>
  <div class="user-info-show-card" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <slot></slot>
    <user-info-card v-if="visible" :class="animate" :userDTO="userDTO" easy></user-info-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import UserInfoCard from "./UserInfoCard";
  export default {
    name: "UserInfoShowCard",
    components: {UserInfoCard},
    data() {
      return {
        visible: false,
        animate: "out"
      }
    },
    props:{
      userDTO: Object
    },
    methods: {
      mouseenter() {
        this.visible = true;
        this.$nextTick(()=>{
          setTimeout(()=>{
            this.animate = "in";
          },300);
        })

        console.log("mouseenter");
      },
      mouseleave() {
        this.animate = "out";
        this.$nextTick(()=>{
          setTimeout(()=>{
            this.visible = false;
          },300);
        })
        console.log("mouseleave");
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .user-info-show-card {
    .user-info-card{
      position: absolute;
      top: 0;
      left: 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);

      z-index: 2;
      background: var(--skin);
      color: var(--skin-font);

      padding: 15px;
      width: 300px;
      max-width: 530%;

      opacity: 0;
      transition: opacity 0.3s,transform  0.3s;
      transform-origin: left top;
      .el-card__header{
        border: unset;
      }
    }
    .user-info-card.in{
      opacity: 1;
      transform: scale(1)
    }
  }
</style>
