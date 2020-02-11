<template>
  <div class="article-comment" :id="'comment-' + comment.articleCommentId">
    <user-info-show-card :userDTO="comment.userDTO">
      <el-avatar :size="50" :src="comment.userDTO.userFace"></el-avatar>
    </user-info-show-card>

    <div class="comment-box">
      <div class="info-box">
        <el-link class="nick my-el-link" style="vertical-align: unset;" @click="goUserPage">{{comment.userDTO.userNick}}</el-link>
        <span class="time">
          {{$utils.quickTimeago(comment.articleCommentTime)}}
        </span>
      </div>
      <div class="comment">
        <editor :class="startEdit?'startEdit':''" ref="editor" :line-numbers="false" :show-tools="startEdit ? true : false" :active="startEdit? false : true" v-model="comment.articleComment"></editor>
      </div>
      <div v-if="!startEdit" class="operate" style="text-align: right;">
        <span @click="startReplay = true">回复</span>
        <template v-if="isMy">
          <span @click="startEdit = true">编辑</span>
          <span @click="onDel(comment)">删除</span>
        </template>
      </div>
      <template v-if="startEdit">
        <div style="width: 100%;text-align: right;margin-top: 10px;">
          <el-button size="mini" class="my-button-style-skin" @click="onEdit(comment)">确认</el-button>
          <el-button size="mini" class="my-button-style" @click="startEdit = false">取消</el-button>
        </div>
      </template>
      <template v-if="startReplay">
        <article-comment-add @submit="onReplay({content: $event,commentId: comment.articleCommentId})" @cancel="startReplay = false"></article-comment-add>
      </template>
      <template v-if="comment.sonArticleComments && comment.sonArticleComments.length > 0">
        <el-divider></el-divider>
        <div class="son-article-comments" v-for="(sonComment,index) in comment.sonArticleComments" :key="sonComment.articleCommentId">
          <article-comment :level="level + 1" @replay="onReplay" @edit="onEdit" @del="onDel" :comment="sonComment"></article-comment>
          <el-divider v-if="index < comment.sonArticleComments.length - 1"></el-divider>
        </div>
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import UserInfoShowCard from "./UserInfoShowCard";
  import Editor from "../../../components/Editor";
  import ArticleCommentAdd from "./ArticleCommentAdd";
  export default {
    name: "ArticleComment",
    components: {ArticleCommentAdd, Editor, UserInfoShowCard},
    data() {
      return {
        startReplay: false,
        startEdit: false
      }
    },
    props:{
      comment: Object,
      level: {
        type: Number,
        default: 1
      }
    },
    computed:{
      isMy(){
        if (!this.comment || !this.$store.getters['User/getUserInfo']) return false;
        return this.comment.userDTO.userId === this.$store.getters['User/getUserInfo'].userId;
      }
    },
    methods: {
      //去指定用户的用户页面
      goUserPage() {
        this.$router.push({
          path: "/user/" + this.comment.userDTO.userId
        })
      },

      /**
       * 回复事件
       */
      onReplay({content: content,commentId: commentId}){
        this.startReplay = false;
        this.$emit("replay",{
          content: content,
          commentId: commentId
        });
      },
      /**
       * 编辑事件
       */
      onEdit(comment){
        this.startEdit = false;
        this.$emit("edit",comment);
      },
      /**
       * 删除事件
       */
      onDel(comment){
        this.$emit("del",comment);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.article-comment {
  /*display: flex;
  position: relative;
  flex-wrap: wrap;*/
  .user-info-show-card{
    position: absolute;
  }
  .comment-box{
    margin-left: 60px ;
    flex: 1;
    .info-box{
      .nick{
        font-size: 16px;
        font-weight: bold;
      }
      .time{
        /*float: right;*/
        font-size: 12px;
        color: var(--gray);
      }
    }
  }
  .comment{
    margin-top: 5px;
    word-break: break-word;
    .markdown-body{
      min-height: auto;
      padding: 0;
    }
  }
  .operate{
    text-align: right;
    > span{
      margin-left: 10px;
      color: var(--gray);
      font-size: 10px;
      cursor: pointer;
    }
  }

  .Editor.startEdit{
    border: 1px solid #DCDFE6;
    .CodeMirror{
      height: 100px;
    }
  }
}
</style>
