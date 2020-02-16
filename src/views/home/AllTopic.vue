<template>
  <div class="all-topic">
    <home-layout :noRight="true">
      <template slot="left">
        <el-row :gutter="20">
          <el-col v-for="item in topics" :md="6">
            <div class="topic-info">
              <topic-item type="" :name="item.topicName"></topic-item>
            </div>
          </el-col>
        </el-row>
      </template>
    </home-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopicItem from "../../components/TopicItem";
  import HomeLayout from "./components/HomeLayout";
  export default {
    name: "AllTopic",
    components: {HomeLayout, TopicItem},
    data() {
      return {
        topics: []
      }
    },
    mounted(){
      this.getHotTopics();
    },
    methods: {
      getHotTopics(){
        this.$store.dispatch('Topic/getHotTopics').then(res=>{
          this.topics = res.data.records;
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .all-topic {
    .topic-info{
      text-align: center;
      background: var(--skin);
      color: #fff;
      padding: 10px;
      margin-bottom: 20px;
    }
  }
</style>
