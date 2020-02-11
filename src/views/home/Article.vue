<template>
  <div class="article">
    <home-layout>
      <template slot="left">
        <el-card class="box-card article-card" :class="{'delete-status': article.articleStatus === 0 }">
          <div slot="header" class="article-card-header">
            <user-info-show-card :userDTO="article.userDTO">
              <el-avatar :size="50" :src="article.userDTO.userFace"></el-avatar>
            </user-info-show-card>
            <div class="article-box">
              <div class="title">{{article.articleTitle}}</div>
              <div class="info">
                  <span>
                    <el-link class="author-name my-el-link" style="vertical-align: unset;" @click="goUserPage">{{article.userDTO.userNick}}</el-link>
                    <span> · </span>
                    <span :title="article.articleUpdateTime">{{$utils.quickTimeago(article.articleUpdateTime)}}</span>
                  </span>
              </div>
          </div>
          <div v-if="isMy">
            <el-dropdown @command="handleCommand">
              <i class="el-icon-more"></i>
              <el-dropdown-menu slot="dropdown" style="width: 150px;">
                <el-dropdown-item icon="el-icon-edit-outline" command="goEditArticle">编辑</el-dropdown-item>
                <el-dropdown-item v-if="article.articleStatus === 1" divided icon="el-icon-delete" command="delArticle">删除</el-dropdown-item>
                <el-dropdown-item v-else divided icon="el-icon-delete" command="restoreArticle">恢复</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
          <div class="content">
            <editor ref="editor" :show-tools="false" :active="true" v-model="article.articleContent"></editor>
          </div>
          <!--<div class="handler">-->
            <!--<show-num-component num="1" type="success">-->
              <!--点赞 <i class="el-icon-thumb"></i>-->
            <!--</show-num-component>-->
            <!--<show-num-component num="1" >-->
              <!--收藏 <i class="el-icon-star-off"></i>-->
            <!--</show-num-component>-->
          <!--</div>-->
          <div class="tags">
            <tag-item v-for="tag in article.articleTags" :key="tag" :name="tag"></tag-item>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header">
            <span><i class="el-icon-chat-line-round"></i> 最新回复</span>
          </div>
          <div v-for="comment in article.articleComments" :key="comment.articleCommentId">
            <article-comment :comment="comment" @edit="onCommentEdit" @replay="onCommentReply" @del="onCommentDel"></article-comment>
            <el-divider></el-divider>
          </div>
          <article-comment-add ref="articleCommentAdd" @submit="onCommentReply({content: $event,commentId: 0})"></article-comment-add>
        </el-card>
      </template>
      <template slot="right">
        <el-card class="box-card menu-card">
          <div slot="header">
            <span>目录</span>
          </div>
          <el-tree
            class="filter-tree"
            :data="menus"
            :props="menuProps"
            default-expand-all
            @node-click="menuTreeClick"
            ref="tree">
            <span slot-scope="{ node, data }">
              {{data.index}}.{{data.level}} {{data.name}}
            </span>
          </el-tree>
        </el-card>
      </template>
    </home-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import ShowNumComponent from "../../components/home/ShowNumComponent";
  import TagItem from "../../components/TagItem";
  import Editor from "../../components/Editor";
  import HomeLayout from "./components/HomeLayout";
  import UserInfoCard from "./components/UserInfoCard";
  import UserInfoShowCard from "./components/UserInfoShowCard";
  import ArticleComment from "./components/ArticleComment";
  import ArticleCommentAdd from "./components/ArticleCommentAdd";
  export default {
    name: "Article",
    components: {
      ArticleCommentAdd,
      ArticleComment,
      UserInfoShowCard, UserInfoCard, HomeLayout, Editor, TagItem, ShowNumComponent},
    data() {
      return {
        articleId: null,
        article:{
          articleId: null,
          articleTitle: null,
          articleContent: "",
          articleAddTime: null,
          articleUpdateTime: "",
          articleStatus: null,
          articleCommentCount: 0,
          userDTO: {userNick: "",userFace: "",userId: null},
          articleTags: [],
          articleTopics: []
        },
        menus: [],
        menuProps:{
          children: 'children',
          label: 'name'
        }
      }
    },
    computed:{
      userInfo(){
        return this.$store.getters['User/getUserInfo'];
      },
      isMy(){
        return this.userInfo && this.userInfo.userId === this.article.userDTO.userId;
      }
    },
    async mounted(){
      this.articleId = this.$route.params.articleId;
      await this.addArticleView();
      //初始化文章数据
      await this.getArticle();


      //监听 class  CodeMirror-matching-topic 点击
      this.$nextTick(()=>{
        let self = this;
        $('.CodeMirror-matching-topic').on('click',function(event){
          let name = $(this).text().substring(1,$(this).text().length - 1);
          self.$router.push({
            path: '/topic/' + name
          })
        });
      })
    },
    methods: {
      handleCommand(command){
        if (command === "goEditArticle"){
          this.goEditArticle();
        }
        if (command === "delArticle"){
          this.saveArticleStatus(0);
        }
        if (command === "restoreArticle"){
          this.saveArticleStatus(1);
        }
      },
      addArticleView(){
        return this.$store.dispatch('Article/addArticleView',this.articleId).then(res=>{
        });
      },
      getArticle() {
        return this.$store.dispatch('Article/getArticle',this.articleId).then(res=>{
          this.article = res.data;
          this.$nextTick(()=>{
            this.menus = this.$refs.editor.getMdMenu();
          })
        },err=>{
          this.$router.push({
            path: "/"
          });
        })
      },
      goEditArticle(){
        this.$router.push({
          path: "/writeArticle/" + this.article.articleId
        });
      },
      //去指定用户的用户页面
      goUserPage() {
        this.$router.push({
          path: "/user/" + this.article.userDTO.userId
        })
      },
      saveArticleStatus(status){
        this.$store.dispatch('Article/saveArticleStatus',{
          articleId: this.articleId,
          articleStatus: status
        }).then(res=>{
          this.$message.success('修改成功');
          this.getArticle();
        })
      },


      menuTreeClick(data,node){
        window.location.hash = data.id;
      },


      /**
       * 回复评论
       * @param content
       * @param commentId
       */
      onCommentReply({content,commentId}){
        let params = {
          articleId: this.article.articleId,
          parentArticleCommentId: commentId,
          articleComment: content
        }
        this.$store.dispatch("Comment/addArticleComment",params).then(res=>{
          this.$refs.articleCommentAdd.clearContent();
          this.$message.success("回复成功");
          this.getArticle();
        })
      },

      /**
       * 编辑评论
       * @param comment
       */
      onCommentEdit(comment){
        let params = {
          articleCommentId: comment.articleCommentId,
          articleComment: comment.articleComment
        }
        this.$store.dispatch("Comment/editArticleComment",params).then(res=>{
          this.$message.success("编辑成功");
          this.getArticle();
        })
      },

      /**
       * 删除评论
       * @param comment
       */
      onCommentDel(comment){
        this.$confirm('此操作将永久删除该条评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("Comment/delArticleComment",comment.articleCommentId).then(res=>{
            this.$message.success("删除成功");
            this.getArticle();
          })
        });
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.article {
  .article-card{
    margin-bottom: 20px;
    flex-direction: column;
    position: relative;
    .article-card-header{
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .article-box{
        flex: 1;
        margin: 0 10px;

        > div{
          margin: 2px 0;
        }
        .title{
          font-size: 20px;
        }
        .info{
          color: var(--gray);
          font-size: 13px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .content{
      word-break: break-all;
    }
    .handler{
      text-align: center;
      .show-num-component + .show-num-component{
        margin: 20px 40px;
      }
    }
  }


  .article-card.delete-status{
    .article-card-header .article-box .title{
      text-decoration: line-through;
    }
  }
}
</style>
