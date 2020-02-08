<template>
  <div class="Hitokoto" :style="'padding: ' + padding + 'px;'" @click="change">
    <div class="word">
      “ {{hitokoto.hitokoto}} ”
    </div>
    <div class="from">
      - {{hitokoto.from}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Hitokoto",
    data() {
      return {
        hitokoto: {
          hitokoto: "",
          from: ""
        }
      }
    },
    props:{
      padding: {
        type: Number,
        default: 40
      }
    },
    mounted(){
      this.change();
    },
    methods: {
      change() {
        $.get('https://v1.hitokoto.cn/?encode=json',(res)=>{
          this.hitokoto = res;
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .Hitokoto {
    cursor: pointer;
    .word{
      text-align: center;
      font-size: 1.5rem;
    }
    .from{
      text-align: right;
    }
  }
</style>
