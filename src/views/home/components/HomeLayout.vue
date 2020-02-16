<template>
  <div class="HomeLayout">
    <el-row :gutter="20">
      <el-col class="left-home-layout" :xs="24" :md="noRight ? 24 : 18" >
        <slot name="left"></slot>
      </el-col>
      <el-col class="right-home-layout" v-if="!noRight" :xs="24" :md="6">
        <div id="rightHomeLayoutWidthBox" style="width: 100%;"></div>
        <template v-if="isMobile">
          <el-drawer
            custom-class="right-home-layout-drawer"
            :modal="true"
            :visible.sync="drawer"
            direction="rtl"
            size="60%"
            :with-header="false">
            <slot name="right">
              <home-right></home-right>
            </slot>
          </el-drawer>
        </template>
        <template v-else>
          <div style="position: fixed;" :style="'width: ' + width + 'px'">
            <slot name="right">
              <home-right></home-right>
            </slot>
          </div>
        </template>
      </el-col>
    </el-row>

    <home-tools :noFold="noRight" @fold="drawer = true"></home-tools>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeRight from "../HomeRight";
  import HomeTools from "./HomeTools";
  export default {
    name: "HomeLayout",
    components: {HomeTools, HomeRight},
    props:{
      noRight: Boolean
    },
    data() {
      return {
        width: 0,
        drawer: false
      }
    },
    computed:{
      isMobile(){
        return this.$store.getters.getIsMobile;
      },
    },
    mounted(){
      this.$nextTick(()=>{
        if (!this.isMobile) {
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
.right-home-layout-drawer{
  padding: 10px;
}
</style>
