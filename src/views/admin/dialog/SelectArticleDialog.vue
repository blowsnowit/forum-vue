<template>
  <div class="SelectArticleDialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      class="my-el-dialog"
      width="20%">
      <el-input v-model="articleTitle" placeholder="模糊搜索文章标题,回车搜索" @change="loadArticleList"></el-input>
      <list :datas="datas" style="min-height: 200px;">
        <div slot-scope="scope" :title="scope.item.articleTitle" @click="selectArticle(scope.item)"
             style="white-space: nowrap;overflow: hidden;">
          {{scope.item.articleTitle}}
        </div>
      </list>
      <page ref="page" @change="loadArticleList"></page>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from "../../../components/List";
  import Page from "../../../components/Page";
  export default {
    name: "SelectArticleDialog",
    components: {Page, List},
    data() {
      return {
        dialogVisible: false,

        datas: [],
        articleTitle: null
      }
    },
    methods: {
      open() {
        this.dialogVisible = true;

        //没有数据才初始化一次
        if (this.datas.length === 0){
          this.$nextTick(()=>{
            this.loadArticleList();
          })
        }
      },
      close(){
        this.dialogVisible = false;
      },
      submit(){
        this.close();
      },

      loadArticleList(){
        let params = this.$refs.page.getPage();

        params.searchWord = this.articleTitle;

        this.$store.dispatch("AdminArticle/getArticles",params).then(res=>{
          this.$refs.page.setPage(res.data);
          this.datas = res.data.records;
        })
      },


      selectArticle(article){
        this.$emit("select",article);
        this.close();
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .SelectArticleDialog {

  }
</style>
