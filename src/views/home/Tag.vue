<template>
  <div class="Tag">
    <home-layout>
      <template slot="left">
        <el-card class="box-card article-list-card">
          <div class="topic-info">
            <div class="name">
              <div class="left">
                <tag-item :name="tagName" :go="false"></tag-item>
              </div>
              <div class="right" style="font-size: 13px;">文章总数 {{tag.articleNum}}</div>
              <div class="clearfix"></div>
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
  import TagItem from "../../components/TagItem";
  export default {
    name: "Tag",
    components: {TagItem, Page, HomeLayout, HomeRight, ArticleCard},
    data() {
      return {
        datas: [],
        tag: {
          articleNum: 0
        },
        tagName: null,

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
        this.tagName = this.$route.params.name;
        this.getTagInfo().then(()=>{
          this.list();
        });
      },
      getTagInfo(){
        return this.$store.dispatch('Tag/getTagInfo',this.tagName).then(res=>{
          this.tag = res.data;
        })
      },
      list(){
        let params = this.$refs.page.getPage();
        params.tagName = this.tagName;
        this.$store.dispatch('Article/getArticles',params).then(res=>{
          this.datas = res.data.records;
          this.$refs.page.setPage(res.data);
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .Tag {
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
