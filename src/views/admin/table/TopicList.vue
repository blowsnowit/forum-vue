<template>
  <div class="TopicList">
    <admin-table-layout ref="table" expand :columns="columns" :searchConditions="searchConditions" :loadTable="loadTable">
      <!--查询条件-->
      <el-form label-position="left" inline @submit.native.prevent>
        <el-form-item label="话题名称">
          <el-input size="mini" v-model="searchConditions.searchWord"
                    @keyup.enter.native="toggleLoadTable"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" class="my-button-style-skin" @click="toggleLoadTable">查询</el-button>
        </el-form-item>
      </el-form>

      <template slot="expand" slot-scope="scope">
        <el-form label-position="left" :model="scope.row" class="demo-table-expand">
          <el-form-item label="话题名称">
            {{scope.row.topicName}}
          </el-form-item>
          <el-form-item label="话题描述">
            <el-input type="textarea" :rows="4" size="mini" v-model="scope.row.topicDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" class="my-button-style-skin" @click="saveTopicDesc(scope.row)">保存</el-button>
            <el-button size="mini" @click="toggleRowExpansion(scope.row)">取消</el-button>
          </el-form-item>
        </el-form>
      </template>


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
        return this.$store.dispatch("AdminTopic/getTopics",params);
      },


      /**
       * 保存话题描述
       * @param row
       */
      saveTopicDesc(row){
        let params = {
          topicName: row.topicName,
          topicDesc: row.topicDesc
        }
        this.$store.dispatch("AdminTopic/saveTopicDesc",params).then(res=>{
          this.$message.success("修改成功");
        });
      },


      //关闭展开框
      toggleRowExpansion(row){
        this.$refs.table.toggleRowExpansion(row,false);
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .TopicList {

  }
</style>
