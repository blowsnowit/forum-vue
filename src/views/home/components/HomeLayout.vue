<template>
  <div class="HomeLayout">
    <el-row :gutter="20">
      <el-col class="left-home-layout" :xs="24" :md="noRight ? 24 : 18" >
        <slot name="left"></slot>
      </el-col>
      <el-col class="right-home-layout" v-if="!noRight" :xs="24" :md="6">
        <div id="rightHomeLayoutWidthBox" style="width: 100%;"></div>
        <div style="position: fixed;" :style="'width: ' + width + 'px'">
          <slot name="right">
            <home-right></home-right>
          </slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeRight from "../HomeRight";
  export default {
    name: "HomeLayout",
    components: {HomeRight},
    props:{
      noRight: Boolean
    },
    data() {
      return {
        width: 0
      }
    },
    mounted(){
      this.$nextTick(()=>{
        if (!window.isMobile) {
          //获取宽度
          this.width = $("#rightHomeLayoutWidthBox")[0].offsetWidth;
        }
      })

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.HomeLayout {

}
</style>
