<template>
  <div class="ArticleList">
    <admin-table-layout expand="" :columns="columns" :loadTable="loadTable">
      <template slot="expand" slot-scope="scope">
        <el-form label-position="left" :model="scope.row" inline class="demo-table-expand">
          <el-row :gutter="10">
           <el-col :span="12">
             <el-form-item label="文章标题">
               <el-input size="mini" v-model="scope.row.articleTitle"></el-input>
             </el-form-item>
             <el-form-item label="阅览次数">
               <el-input size="mini" v-model="scope.row.articleView"></el-input>
             </el-form-item>
             <el-form-item label="文章置顶">
               <el-input size="mini" v-model="scope.row.articleTop" placeholder="文章置顶：0不置顶，倒序排序"></el-input>
             </el-form-item>
             <el-form-item label="文章状态">
               <el-switch
                 v-model="scope.row['articleStatus']"
                 :active-value="1"
                 :inactive-value="0"
                 active-color="var(--skin-success)">
               </el-switch>
             </el-form-item>
           </el-col>
            <el-col :span="12">
              <el-form-item label="文章内容" class="editor-form-item">
                <editor v-model="scope.row.articleContent" :show-tools="false"></editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button size="mini" class="my-button-style-skin" @click="saveArticle(scope.row)">保存</el-button>
            <el-button size="mini" @click="toggleRowExpansion(scope.row)">取消</el-button>
          </el-form-item>
        </el-form>
      </template>



      <template slot="articleContent" slot-scope="scope">
        <span style="white-space: nowrap;" :title="scope.value">{{scope.value}}</span>
      </template>

      <template slot="articleStatus" slot-scope="scope">
        <el-switch
          @change="changeArticleStatus($event,scope)"
          v-model="scope.row['articleStatus']"
          :active-value="1"
          :inactive-value="0"
          active-color="var(--skin-success)">
        </el-switch>
      </template>

      <template slot="articleContent" slot-scope="scope">
        <span style="white-space: nowrap;" :title="scope.value">{{scope.value}}</span>
      </template>

    </admin-table-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminTableLayout from "../components/AdminTableLayout";
  import Editor from "../../../components/Editor";
  export default {
    name: "ArticleList",
    components: {Editor, AdminTableLayout},
    data() {
      return {
        columns:[
          {prop: "articleTitle",label: "文章标题",width: 50},
          {prop: "userDTO.userNick",label: "文章作者",width: 50},
          {prop: "articleContent",label: "文章内容",width: 200},
          {prop: "articleAddTime",label: "发布时间"},
          {prop: "articleUpdateTime",label: "更新时间"},
          {prop: "articleView",label: "阅览次数"},
          {prop: "articleStatus",label: "文章操作",width: 50},
        ]
      }
    },
    methods: {
      //关闭展开框
      toggleRowExpansion(row){
        this.$refs.table.toggleRowExpansion(row,false);
      },

      loadTable(params) {
        return this.$store.dispatch("AdminArticle/getArticles",params);
      },


      /**
       * 修改用户文章状态
       * @param status
       * @param scope
       */
      changeArticleStatus(status,scope){
        console.log('changeArticleStatus',status,scope);
        let articleId = scope.row.articleId;
        this.$store.dispatch("AdminArticle/saveArticleStatus",{
          articleId: articleId,
          articleStatus: status
        }).then(res=>{

        },err=>{
          scope.row['articleStatus'] = !scope.row['articleStatus'];
        })
      },

      /**
       * 修改文章信息
       * @param row
       */
      saveArticle(row){
        let params = {
          articleId: row.articleId,
          articleTitle: row.articleTitle,
          articleContent: row.articleContent,
          articleStatus: row.articleStatus,
          articleTop: row.articleTop,
          articleView: row.articleView,
        }
        this.$store.dispatch("AdminArticle/saveArticle",params).then(res=>{
          this.$message.success("修改成功");
        });
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ArticleList {
    .admin-table-layout .demo-table-expand .el-form-item {
      width: 100%;
    }
    .editor-form-item .el-form-item__content{
      width: 80%;
    }
    .Editor{
      border: 1px solid #DCDFE6;
      .CodeMirror{
        height: 200px;
      }
    }
  }
</style>
