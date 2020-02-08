<template>
  <div class="home">
    <!--<hitokoto></hitokoto>-->
    <home-layout>
      <template slot="left">
        <el-card class="box-card article-list-card">
          <tab-component slot="header" @change="onChangList" :list="tabs" v-model="activeTab" style="padding: 10px"></tab-component>
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
    name: "Home",
    components: {Hitokoto, Page, HomeLayout, HomeRight, TabComponent, ArticleCard, UserInfoCard},
    data() {
      return {
        images: [
          {title: "xxxxx系统1111", image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579600299787&di=faa9b4e409538e1d96c36994b839c934&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F20%2F62%2F01000000000000119086280352820.jpg"},
          {title: "xxxxx系统2222", image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579600299787&di=faa9b4e409538e1d96c36994b839c934&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F20%2F62%2F01000000000000119086280352820.jpg"},
          {title: "xxxxx系统3333", image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579600299787&di=faa9b4e409538e1d96c36994b839c934&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F20%2F62%2F01000000000000119086280352820.jpg"},
          {title: "xxxxx系统4444", image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579600299787&di=faa9b4e409538e1d96c36994b839c934&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F20%2F62%2F01000000000000119086280352820.jpg"},

        ],
        activeTab: "new",
        tabs:[
          {label: "最新",value: "new"},
          {label: "最热",value: "hot"}
        ],

        datas: [],
      }
    },
    computed:{
      searchWord(){
        return this.$store.getters['Article/getSearch'];
      }
    },
    watch:{
      searchWord(){
        this.list();
      }
    },
    mounted(){
      this.list();
    },
    methods: {
      onChangList(item){
        this.activeTab = item.value;
        this.loadList();
      },
      loadList(){
        if (this.activeTab === "new"){
          this.list();
        }else if (this.activeTab === "hot"){
          this.hotList();
        }
      },
      list(){
        let params = this.$refs.page.getPage();
        params.search = this.searchWord;
        this.$store.dispatch('Article/getArticles',params).then(res=>{
          this.datas = res.data.records;
          this.$refs.page.setPage(res.data);
        })
      },
      hotList(){
        let params = this.$refs.page.getPage();
        params.search = this.searchWord;
        this.$store.dispatch('Article/getHotArticles',params).then(res=>{
          this.datas = res.data.records;
          this.$refs.page.setPage(res.data);
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home {
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
  }

}
/*
.layout.route-home {
  margin-top: 50px;
}
*/
</style>
