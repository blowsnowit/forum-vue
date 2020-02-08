<template>
  <div class="article-card" :class="{'delete-status': article.articleStatus === 0 }">
    <el-avatar v-if="!noFace" style="cursor: pointer;" @click="goUserPage" :size="50" :src="article.userDTO.userFace"></el-avatar>
    <div class="article-box">
      <el-link @click="goArticlePage" class="title my-el-link">{{article.articleTitle}}</el-link>
      <div class="content" v-show="!easy">
        {{article.articleContent}}
      </div>
      <div class="info">
        <span>
          <template v-for="(topic,index) in article.articleTopics" >
            <topic-item :name="topic" :key="index"></topic-item>
            <span> · </span>
          </template>
          <el-link @click="goUserPage" class="author-name my-el-link" style="vertical-align: unset;">{{article.userDTO.userNick}}</el-link>
          <span> · </span>
          <span :title="article.articleUpdateTime">{{$utils.quickTimeago(article.articleUpdateTime)}}</span>
        </span>
        <span>
          <i class="el-icon-view" title="阅读量"> {{article.articleView}}</i>&nbsp;&nbsp;
          <!--<i class="el-icon-star-off" title="收藏量">2222</i>&nbsp;&nbsp;-->
          <!--<i class="el-icon-chat-line-round" title="评论">2222</i>-->
        </span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopicItem from "../../../components/TopicItem";
  export default {
    name: "ArticleCard",
    components: {TopicItem},
    props:{
      easy: Boolean,
      //不显示头像
      noFace: Boolean,
      article: Object
    },
    methods: {
      //去指定用户的用户页面
      goUserPage() {
        this.$router.push({
          path: "/user/" + this.article.userDTO.userId
        })
      },
      //去指定文章页面
      goArticlePage(){
        this.$router.push({
          path: "/article/" + this.article.articleId
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.article-card {
  display: flex;

  padding-bottom: 10px;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 10px;
  .article-box{
    flex: 1;
    margin: 0 10px;

    > div{
      margin: 2px 0;
    }
    .title{
      font-size: 18px;
      margin-bottom: 5px;
    }
    .content{
      color: var(--gray);
      word-break: break-all;
    }
    .info{
      color: var(--gray);
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
  }

}
.article-card.delete-status{
  text-decoration: line-through;
}
</style>
