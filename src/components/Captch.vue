<template>
  <img :src="captch" alt="" @click="generatorCaptchUrl" title="看不清？点我切换">
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Captch",
    data() {
      return {
        captch: null
      }
    },
    mounted(){
      this.generatorCaptchUrl();
    },
    methods: {
      generatorCaptchUrl(){
        this.$store.dispatch('User/captch').then(res=>{
          this.captch = 'data:image/png;base64,' + res.data.captch;
          this.$emit('input',res.data.token);
        })
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .Captch {

  }
</style>
