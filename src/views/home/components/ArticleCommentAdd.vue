<template>
  <div class="article-comment-add" :class="noFace?'noFace':''">
    <template v-if="userInfo">
      <el-avatar v-if="!noFace" class="user-face" :size="50" :src="userInfo.userFace"></el-avatar>
      <div class="comment-add-box">
        <editor ref="editor" :lineNumbers="false" placeholder="说点什么..." v-model="content"></editor>
        <div style="width: 100%;text-align: right;margin-top: 10px;">
          <el-button size="mini" class="my-button-style-skin" @click="submit">确认</el-button>
          <el-button size="mini" class="my-button-style" @click="cancel">取消</el-button>
        </div>
      </div>
    </template>
    <template v-else>
      未登录
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import UserInfoShowCard from "./UserInfoShowCard";
  import Editor from "../../../components/Editor";
  export default {
    name: "ArticleCommentAdd",
    components: {Editor, UserInfoShowCard},
    data() {
      return {
        content: null
      }
    },
    props:{
      noFace: Boolean
    },
    computed:{
      userInfo(){
        return this.$store.getters['User/getUserInfo'];
      },
    },
    methods: {
      //去指定用户的用户页面
      goUserPage() {
        this.$router.push({
          path: "/user/" + this.userInfo.userId
        })
      },

      submit(){
        this.$emit("submit",this.content);
      },
      cancel(){
        this.$emit("cancel");
      },
      clearContent(){
        this.content = "";
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.article-comment-add {
  /*display: flex;
  position: relative;
  flex-wrap: wrap;*/
  .user-face{
    position: absolute;
  }
  .comment-add-box{
    margin-left: 60px;
  }
  .Editor{
    border: 1px solid #DCDFE6;
    width: 100%;
    .CodeMirror{
      height: 100px;
    }
  }
}
.article-comment-add.noFace{
  .comment-add-box{
    margin-left: 0;
  }
}
</style>
