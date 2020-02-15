<template>
  <div class="Page">
    <el-pagination
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
      style="text-align: center;"
      :current-page="page.current"
      :page-size="page.size"
      :layout="layout"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Page",
    data() {
      return {
        page: {
          current: 1,
          pages: 1,
          total: 10,
          size: this.size
        }
      }
    },
    props:{
      layout:{
        type: String,
        default: "prev, pager, next"
      },
      size:{
        type: Number,
        default: 10
      }
    },
    methods: {
      setPage(page) {
        this.page = page;
      },
      getPage(){
        return {
          pageSize: this.page.size,
          pageCurrent: this.page.current,
        }
      },

      onCurrentChange(current){
        this.page.current = current;
        this.$emit('change');
      },

      onSizeChange(size){
        this.page.size = size;
        this.$emit('change');
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .Page {

  }
</style>
