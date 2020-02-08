<template>
  <div class="Topic">
    <home-layout>
      <template slot="left">
        <el-card class="box-card article-list-card">
          <div class="topic-info">
            <div class="name">
              <div class="left">#{{topicName}}#</div>
              <div class="right" style="font-size: 13px;">文章总数 {{topic.articleNum}}</div>
              <div class="clearfix"></div>
            </div>
            <div class="desc">
              {{topic.topicDesc}}
            </div>
          </div>
          <article-card v-for="(item,index) in datas" :article="item" easy :key="index"></article-card>
          <page ref="page" @change="list"></page>
        </el-card>
      </template>
    </home-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import ArticleCard from "./components/ArticleCard";
  import HomeRight from "./HomeRight";
  import HomeLayout from "./components/HomeLayout";
  import Page from "../../components/Page";
  export default {
    name: "Topic",
    components: {Page, HomeLayout, HomeRight, ArticleCard},
    data() {
      return {
        datas: [],
        topic: {
          articleNum: 0,
          topicDesc: null
        },
        topicName: '话题11',

      }
    },
    watch:{
      '$route.params.name'(){
        this.init();
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        this.topicName = this.$route.params.name;
        this.getTopicInfo().then(()=>{
          this.list();
        });
      },
      getTopicInfo(){
        return this.$store.dispatch('Topic/getTopicInfo',this.topicName).then(res=>{
          this.topic = res.data;
        })
      },
      list(){
        let params = this.$refs.page.getPage();
        params.topicName = this.topicName;
        this.$store.dispatch('Article/getArticles',params).then(res=>{
          this.datas = res.data.records;
          this.$refs.page.setPage(res.data);
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .Topic {
    .topic-info-card{
      .header{
        text-align: center;
      }
      .total-box{
        .name{

        }
        .num{
          font-weight: bold;
        }
      }
    }
    .article-list-card{
      .el-card__header{
        padding: 0;
      }
      .el-card__body{
        padding: 0;
      }
      .article-card{
        padding:  10px;
      }
      .topic-info{
        background: var(--skin);
        color: #fff;
        padding: 10px;
      }
    }
  }
</style>
