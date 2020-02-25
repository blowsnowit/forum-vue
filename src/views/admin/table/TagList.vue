<template>
  <div class="TagList">
    <admin-table-layout ref="table" :columns="columns" :searchConditions="searchConditions" :loadTable="loadTable">
      <!--查询条件-->
      <el-form label-position="left" inline @submit.native.prevent>
        <el-form-item label="标签名称">
          <el-input size="mini" v-model="searchConditions.searchWord"
                    @keyup.enter.native="toggleLoadTable"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" class="my-button-style-skin" @click="toggleLoadTable">查询</el-button>
        </el-form-item>
      </el-form>

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
        ],
        searchConditions:{
          searchWord: null
        }
      }
    },
    methods: {
      toggleLoadTable(){
        this.$refs.table.onLoadTable();
      },

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
