<template>
  <div class="home-tools">
    <ul>
      <!--皮肤-->
      <!--<li>-->
        <!--<el-popover-->
          <!--placement="left"-->
          <!--width="300"-->
          <!--trigger="hover">-->
          <!--<i slot="reference" title="修改皮肤" class="el-icon-brush"></i>-->
          <!--<el-form class="skin-tools-form" inline>-->
            <!--<el-form-item label="皮肤色：">-->
              <!--<el-color-picker></el-color-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="字体色：">-->
              <!--<el-color-picker></el-color-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="字体激活色：">-->
              <!--<el-color-picker></el-color-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="成功色：" >-->
              <!--<el-color-picker></el-color-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="警告色：" >-->
              <!--<el-color-picker></el-color-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="危险色：" >-->
              <!--<el-color-picker></el-color-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="信息色：" >-->
              <!--<el-color-picker></el-color-picker>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        <!--</el-popover>-->
      <!--</li>-->
      <!--右侧展开-->
      <li v-if="isMobile && !noFold" @click="$emit('fold')">
        <i title="展开" class="el-icon-s-fold"></i>
      </li>
      <!--置顶-->
      <li @click="goTop">
        <i title="置顶" class="el-icon-caret-top"></i>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "HomeTools",
    props:{
      noFold: Boolean
    },
    computed: {
      isMobile(){
        return this.$store.getters.getIsMobile;
      }
    },
    methods: {
      //置顶
      goTop() {
        document.documentElement.scrollTop = 0;
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-tools {
  position: fixed;
  right: 0;
  top: 50%;
  bottom: 50%;
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid var(--gray);
    font-size: 20px
    > li{
      padding: 10px;
      color: var(--skin);
      background: var(--skin-font);
      cursor: pointer;
    }
    > li + li{
      border-top: 1px solid var(--gray);
    }
  }

}
.skin-tools-form{
  .el-form-item{
    width: 50%;
    margin: 0;
  }
}
</style>
