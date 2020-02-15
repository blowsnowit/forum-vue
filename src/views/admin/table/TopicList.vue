<template>
  <div class="TopicList">
    <admin-table-layout :columns="columns" :loadTable="loadTable">
      <template slot="topicDesc" slot-scope="scope">
        <span style="white-space: nowrap;" :title="scope.value">{{scope.value}}</span>
      </template>

    </admin-table-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminTableLayout from "../components/AdminTableLayout";
  export default {
    name: "TopicList",
    components: {AdminTableLayout},
    data() {
      return {
        columns: [
          {prop: "topicName",label: "话题名称",width: 30},
          {prop: "topicDesc",label: "话题描述",width: 50},
          {prop: "topicAddTime",label: "话题创建时间",width: 30},
          {prop: "articleNum",label: "文章数量",width: 10}
        ]
      }
    },
    methods: {
      loadTable(params) {
        return this.$store.dispatch("AdminTopic/getTopics",params);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .TopicList {

  }
</style>
