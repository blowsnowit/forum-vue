<template>
  <div class="home-right">
    <el-button class="my-button-style-skin" icon="el-icon-plus" style="width: 100%;" @click="goWrite">发新帖</el-button>
    <!--<user-info-card></user-info-card>-->
    <el-card style="margin-top: 20px;" class="box-card topic-rank-card">
      <div slot="header">
        <span>Top话题</span>
      </div>
      <div  class="list ">
        <div class="item" v-for="(topic,index) in topics" :key="index">
          <span>
            <span class="index" :class="'index-' + (index + 1)">{{index + 1}}</span>
            <topic-item type="none" :name="topic.topicName" :title="topic.topicDesc"></topic-item></span>
          <span>{{topic.articleNum}}</span>
        </div>
        <!---->
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import UserInfoCard from "./components/UserInfoCard";
  import TopicItem from "../../components/TopicItem";
  import List from "../../components/List";
  export default {
    name: "HomeRight",
    components: {List, TopicItem, UserInfoCard},
    data() {
      return {
        topics: []
      }
    },
    mounted(){
      this.getHotTopics();
    },
    methods: {
      goWrite() {
        this.$router.push({
          path: "/writeArticle"
        })
      },
      getHotTopics(){
        this.$store.dispatch('Topic/getHotTopics').then(res=>{
          this.topics = res.data.records;
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-right {
  .topic-rank-card{
    .el-card__body{
      padding: 0;
    }
    .list{
      .item{
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
        .index{
          font-size: 13px;
          padding: 3px 8px;
          border-radius: 50%;
          color: #fff;
          background: var(--skin-info);
        }
        .index.index-1{
          background: var(--skin-danger);
        }
        .index.index-2{
          background: var(--skin-success);
        }
        .index.index-3{
          background: var(--skin-warning);
        }

      }
    }
  }

}
</style>
-
