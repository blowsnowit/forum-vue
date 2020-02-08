<template>
  <div class="WriteArticle">
    <home-layout>
      <template slot="left">
        <el-card class="write-article-card">
          <div slot="header">
            <div class="tip">文章标题：</div>
            <el-input class="my-el-input my-input-no-border" v-model="article.articleTitle" placeholder="请输入文章标题"></el-input>
          </div>
          <div class="tip">文章内容：</div>
          <editor v-model="article.articleContent" :matchTopics="matchTopics"></editor>
          <div class="tip">
            <!--<el-button size="mini" icon="el-icon-view" class="my-button-style left">预览</el-button>-->
            <el-button size="mini" icon="el-icon-check" class="my-button-style-skin right" @click="submit">发布</el-button>
            <div class="clearfix"></div>
          </div>
        </el-card>
      </template>
      <template slot="right">
        <el-card style="margin-bottom: 20px;">
          <div slot="header">
            <div class="tip">文章信息</div>
          </div>
          <div class="tip">加入的话题：</div>
          <div class="topics-box">
            <template v-if="article.articleTopics && article.articleTopics.length === 0">
              无话题
            </template>
            <template v-else>
              <topic-item v-for="item in article.articleTopics" :key="item" :name="item" :go="false"></topic-item>
            </template>
          </div>
          <div class="tip">标签：<el-button size="mini" class="my-button-style" icon="el-icon-plus" @click="addTag">添加</el-button></div>
          <div class="tags-box">
            <span v-for="item in article.articleTags" :key="item" @dblclick="delTag(item)">
              <tag-item  :name="item" :go="false"></tag-item>
            </span>
          </div>
        </el-card>
        <el-card class="write-tip-card">
          <div slot="header">
            <div class="tip">发帖提示</div>
          </div>
          <ul>
            <li>文章内容使用Markdown书写</li>
            <li>文章内容插入话题 <b>#话题名称#</b> </li>
            <li>双击删除标签 </li>
          </ul>
        </el-card>
      </template>
    </home-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeLayout from "./components/HomeLayout";
  import Editor from "../../components/Editor";
  import TopicItem from "../../components/TopicItem";
  import TagItem from "../../components/TagItem";
  export default {
    name: "WriteArticle",
    components: {TagItem, TopicItem, Editor, HomeLayout},
    data() {
      return {
        articleId: null,
        article: {
          articleTitle: null,
          articleContent: null,
          articleTags: [],
          articleTopics: []
        }
      }
    },
    mounted(){
      this.articleId = this.$route.params.articleId;
      if (this.articleId){
        //初始化文章数据
        this.getArticle();
      }
    },
    methods: {
      matchTopics(result) {
        //去重
        this.article.articleTopics = [];
        for (let topic of result){
          if (this.article.articleTopics.includes(topic)) continue;
          this.article.articleTopics.push(topic);
        }
      },
      addTag(){
        this.$prompt('请输入tag名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (this.article.articleTags.includes(value)){
            return;
          }
          this.article.articleTags.push(value);
        });
      },
      delTag(tag){
        for (let i = 0; i < this.article.articleTags.length; i++) {
          if (tag === this.article.articleTags[i]){
            this.article.articleTags.splice(i,1);
            return;
          }
        }
      },

      submit(){
        if (this.articleId == null){
          this.addArticle();
        }else{
          this.saveArticle();
        }
      },
      getArticle() {
        return this.$store.dispatch('Article/getArticle',this.articleId).then(res=>{
          this.article = res.data;
        })
      },
      addArticle(){
        this.$store.dispatch('Article/addArticle',this.article).then(res=>{
          this.$message.success('发布成功');
          this.goArticlePage(res.data);
        })
      },
      saveArticle(){
        this.$store.dispatch('Article/saveArticle',this.article).then(res=>{
          this.$message.success('发布成功');
          this.goArticlePage(this.article.articleId);
        })
      },
      goArticlePage(articleId){
        this.$router.push({
          path: "/article/" + articleId
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.WriteArticle {
  .tip{
    font-size: 15px;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
  }
  .el-card__header,.el-card__body{
    padding: 0;
  }
  .topics-box,.tags-box{
    padding: 10px;
  }
}
</style>
