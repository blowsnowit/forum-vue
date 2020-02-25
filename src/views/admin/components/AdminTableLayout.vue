<template>
  <div class="admin-table-layout">
    <div class="search-conditions">
      <slot></slot>
    </div>
    <el-table
      ref="table"
      :data="datas"
      stripe
      style="width: 100%">
      <el-table-column v-if="expand" type="expand">
        <slot name="expand" slot-scope="props" :row="props.row">
        </slot>
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        :min-width="100">
      </el-table-column>
      <el-table-column
        v-for="(column,index) in columns" :key="index"
        :prop="column.prop"
        :label="column.label"
        :min-width="column.width?column.width: 100">
        <slot :name="column.prop"  slot-scope="scope" :row="scope.row" :value="getRowValue(scope.row,column.prop)">
          {{getRowValue(scope.row,column.prop)}}
        </slot>
      </el-table-column>
    </el-table>
    <page ref="page" layout="total, prev, pager, next" @change="onLoadTable" style="padding: 10px;background: #fff;"></page>
  </div>
</template>

<script type="text/ecmascript-6">
  import Page from "@/components/Page";
  export default {
    name: "AdminTableLayout",
    components: {Page},
    data() {
      return {
        datas: []
      }
    },
    props:{
      columns:{
        type: Array,
        default: ()=>[]
      },
      loadTable: {
        type: Function,
        default: ()=>{}
      },
      expand:{
        type: Boolean,
        default: false
      },
      searchConditions:{
        type: Object,
        default: ()=>{}
      }
    },
    computed:{
      getRowValue(){
        return (row,prop)=>{
          let arr = prop.split(".");
          if (arr.length === 1){
            return row[prop];
          }else if (arr.length > 1){
            let data = {...row};
            for (let i = 0; i < arr.length; i++) {
              data = data[arr[i]];
            }
            return data;
          }
          return null;
        }
      }
    },
    mounted(){
      this.onLoadTable();
    },
    methods: {
      onLoadTable() {
        let params = this.$refs.page.getPage();
        params = {...params,...this.searchConditions};
        this.loadTable(params).then(res=>{
          this.datas = res.data.records;
          this.$refs.page.setPage(res.data);
        });
      },

      /**
       * 触发打开/关闭展开
       * @param row
       * @param expanded
       */
      toggleRowExpansion(row,expanded=true){
        this.$refs.table.toggleRowExpansion(row,expanded);
      }
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .admin-table-layout {
    .search-conditions{
      padding: 20px;
      .el-form-item{
        margin-bottom: 0;
      }
    }
    .demo-table-expand {
      font-size: 0;
      label {
        width: 90px;
        color: var(--gray);
      }
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }
</style>
