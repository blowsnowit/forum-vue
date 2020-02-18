<template>
  <div class="search">
    <home-layout>
      <template slot="left">
        <el-card class="box-card article-list-card">
          <div class="search-info">
            <div class="name">
              正在搜索：{{searchWord}}
            </div>
          </div>
          <article-card v-for="(item,index) in datas" :article="item" easy :key="index"></article-card>
          <page ref="page" @change="loadList"></page>
        </el-card>
      </template>
    </home-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import UserInfoCard from "./components/UserInfoCard";
  import ArticleCard from "./components/ArticleCard";
  import TabComponent from "../../components/home/TabComponent";
  import HomeRight from "./HomeRight";
  import HomeLayout from "./components/HomeLayout";
  import Page from "../../components/Page";
  import Hitokoto from "../../components/Hitokoto";
  export default {
    name: "Search",
    components: {Hitokoto, Page, HomeLayout, HomeRight, TabComponent, ArticleCard, UserInfoCard},
    data() {
      return {
        datas: [],
      }
    },
    computed:{
      searchWord(){
        return this.$route.params.searchWord;
      }
    },
    watch:{
      "$route.params"(){
        this.list();
      }
    },
    mounted(){
      this.list();
    },
    methods: {
      list(){
        let params = this.$refs.page.getPage();
        if (this.searchWord){
          params.search = this.searchWord;
        }
        this.$store.dispatch('Article/searchArticles',params).then(res=>{
          this.datas = res.data.records;
          this.$refs.page.setPage(res.data);
        })
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.search {
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
    .search-info{
      background: var(--skin);
      color: #fff;
      padding: 10px;
    }
  }

}
</style>
