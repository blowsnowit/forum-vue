<template>
  <div class="Page">
    <el-pagination
      @current-change="onCurrentChange"
      style="text-align: center;"
      :current-page="page.current"
      :page-size="page.size"
      layout="prev, pager, next"
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
          size: 10,
          total: 10
        }
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
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .Page {

  }
</style>
