<template>
  <div class="TagList">
    <admin-table-layout :columns="columns" :loadTable="loadTable">
      <template slot="articleComment" slot-scope="scope">
        <span style="white-space: nowrap;" :title="scope.value">{{scope.value}}</span>
      </template>

      <template slot="operate" slot-scope="scope">
        <el-button size="mini" icon="el-icon-delete" type="danger"></el-button>
      </template>

    </admin-table-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminTableLayout from "../components/AdminTableLayout";
  export default {
    name: "TagList",
    components: {AdminTableLayout},
    data() {
      return {
        columns: [
          {prop: "tagName",label: "标签名称",width: 50},
          {prop: "tagAddTime",label: "标签创建时间",width: 50},
          {prop: "articleNum",label: "文章数量",width: 20},
        ]
      }
    },
    methods: {
      loadTable(params) {
        return this.$store.dispatch("AdminTag/getTags",params);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .TagList {

  }
</style>
