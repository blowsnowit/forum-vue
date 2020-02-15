<template>
  <div class="CommentList">
    <admin-table-layout ref="table" :columns="columns" :loadTable="loadTable">
      <template slot="articleComment" slot-scope="scope">
        <span style="white-space: nowrap;" :title="scope.value">{{scope.value}}</span>
      </template>

      <template slot="operate" slot-scope="scope">
        <el-button size="mini" icon="el-icon-delete" type="danger" @click="delArticleComment(scope.row.articleCommentId)"></el-button>
      </template>

    </admin-table-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminTableLayout from "../components/AdminTableLayout";
  export default {
    name: "CommentList",
    components: {AdminTableLayout},
    data() {
      return {
        columns: [
          {prop: "articleDTO.articleTitle",label: "文章标题",width: 50},
          {prop: "userDTO.userNick",label: "评论用户",width: 50},
          {prop: "articleComment",label: "评论内容",width: 100},
          {prop: "articleCommentTime",label: "评论时间",width: 50},
          {prop: "operate",label: "操作",width: 30},
        ]
      }
    },
    methods: {
      loadTable(params) {
        return this.$store.dispatch("AdminComment/getComments",params);
      },

      /**
       * 删除文章评论
       * 删除后刷新当前页面数据
       * @param articleCommentId
       */
      delArticleComment(articleCommentId){
        this.$store.dispatch("AdminComment/delArticleComment",articleCommentId).then(res=>{
          this.$message.success("删除成功");
          this.$refs.table.onLoadTable();
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .CommentList {

  }
</style>
