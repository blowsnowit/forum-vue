<template>
  <div class="CommentList">
    <admin-table-layout ref="table" :columns="columns" :searchConditions="searchConditions" :loadTable="loadTable">
      <!--查询条件-->
      <el-form label-position="left" inline >
        <el-form-item label="指定文章">
          <template v-if="searchConditions.articleId == null">
            <el-button size="mini" class="my-button-style-skin" @click="openSelectArticleDialog">选择文章</el-button>
          </template>
          <el-tag v-else closable class="my-el-tag" @close="delSelectArticle">
            {{article.articleTitle}}
          </el-tag>
        </el-form-item>
      </el-form>

      <template slot="articleComment" slot-scope="scope">
        <span style="white-space: nowrap;" :title="scope.value">{{scope.value}}</span>
      </template>

      <template slot="operate" slot-scope="scope">
        <el-switch
          @change="changeArticleCommentStatus($event,scope)"
          v-model="scope.row['articleCommentStatus']"
          :active-value="1"
          :inactive-value="0"
          active-color="var(--skin-success)">
        </el-switch>
        <!--<el-button size="mini" icon="el-icon-delete" type="danger" @click="delArticleComment(scope.row.articleCommentId)"></el-button>-->
      </template>

    </admin-table-layout>
    <select-article-dialog ref="selectArticleDialog" @select="callbackSelctArticle"></select-article-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminTableLayout from "../components/AdminTableLayout";
  import SelectArticleDialog from "../dialog/SelectArticleDialog";
  export default {
    name: "CommentList",
    components: {SelectArticleDialog, AdminTableLayout},
    data() {
      return {
        columns: [
          {prop: "articleDTO.articleTitle",label: "文章标题",width: 50},
          {prop: "userDTO.userNick",label: "评论用户",width: 50},
          {prop: "articleComment",label: "评论内容",width: 100},
          {prop: "articleCommentTime",label: "评论时间",width: 50},
          {prop: "operate",label: "操作",width: 30},
        ],
        searchConditions:{
          articleId: null
        },

        article: null
      }
    },
    methods: {
      toggleLoadTable(){
        this.$refs.table.onLoadTable();
      },

      loadTable(params) {
        return this.$store.dispatch("AdminComment/getComments",params);
      },


      /**
       * 修改文章评论状态
       * @param status
       * @param scope
       */
      changeArticleCommentStatus(status,scope){
        let articleCommentId = scope.row.articleCommentId;

        this.$store.dispatch("AdminComment/saveArticleCommentStatus",{
          articleCommentId: articleCommentId,
          articleCommentStatus: status
        }).then(res=>{
        },err=>{
          scope.row['articleCommentStatus'] = !scope.row['articleCommentStatus'];
        })
      },
      /**
       * 删除文章评论
       * 删除后刷新当前页面数据
       * @param articleCommentId
       */
      delArticleComment(articleCommentId){
        this.$store.dispatch("AdminComment/delComment",articleCommentId).then(res=>{
          this.$message.success("删除成功");
          this.$refs.table.onLoadTable();
        })
      },

      /**
       * 打开选择文章弹窗
       */
      openSelectArticleDialog(){
        this.$refs.selectArticleDialog.open();
      },
      /**
       * 回调选择的文章
       * @param article
       */
      callbackSelctArticle(article){
        this.article = article;
        this.searchConditions.articleId = article.articleId;
        this.toggleLoadTable();
      },
      /**
       * 删除选择的文章
       */
      delSelectArticle(){
        this.article = null;
        this.searchConditions.articleId = null;
        this.toggleLoadTable();
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .CommentList {

  }
</style>
