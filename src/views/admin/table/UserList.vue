<template>
  <div class="UserList">
    <admin-table-layout ref="table" expand="" :columns="columns" :loadTable="loadTable">
      <template slot="expand" slot-scope="scope">
        <el-form label-position="left" :model="scope.row" inline class="demo-table-expand">
          <el-form-item label="用 户 名">
            <el-input size="mini" v-model="scope.row.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input size="mini" v-model="scope.row.userNick"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input size="mini" v-model="scope.row.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input size="mini" v-model="userNewPassword" placeholder="留空不修改密码"></el-input>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-switch
              v-model="scope.row['userStatus']"
              :active-value="1"
              :inactive-value="0"
              active-color="var(--skin-success)">
            </el-switch>
          </el-form-item>
          <el-form-item label="管理员">
            <el-switch
              v-model="scope.row['userOp']"
              :active-value="1"
              :inactive-value="0"
              active-color="var(--skin-success)">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" class="my-button-style-skin" @click="saveUserInfo(scope.row)">保存</el-button>
            <el-button size="mini" @click="toggleRowExpansion(scope.row)">取消</el-button>
          </el-form-item>
        </el-form>
      </template>


      <template slot="userDesc" slot-scope="scope">
        <span style="white-space: nowrap;" :title="scope.value">{{scope.value}}</span>
      </template>
      <template slot="userFace" slot-scope="scope">
        <img style="width: 30px;height: 30px;" :src="scope.value"/>
      </template>
      <template slot="userOp" slot-scope="scope">
        <template v-if="scope.value === 1">
          <el-tag>管理员</el-tag>
        </template>
        <template v-else>
          <el-tag type="info">用户</el-tag>
        </template>
      </template>

      <template slot="userStatus" slot-scope="scope">
        <el-switch
          @change="changeUserStatus($event,scope)"
          v-model="scope.row['userStatus']"
          :active-value="1"
          :inactive-value="0"
          active-color="var(--skin-success)">
        </el-switch>
      </template>

    </admin-table-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminTableLayout from "../components/AdminTableLayout";
  export default {
    name: "UserList",
    components: {AdminTableLayout},
    data() {
      return {
        columns: [
          {prop: "userOp",label: "管理员",width: 40},
          {prop: "userName",label: "用户名",width: 50},
          {prop: "userNick",label: "用户昵称",width: 50},
          {prop: "userFace",label: "用户头像",width: 50},
          {prop: "userDesc",label: "用户签名",width: 150},
          {prop: "userStatus",label: "用户状态",width: 50}
        ],
        userNewPassword: null
      }
    },
    methods: {
      //关闭展开框
      toggleRowExpansion(row){
        this.$refs.table.toggleRowExpansion(row,false);
      },



      loadTable(params) {
        return this.$store.dispatch("AdminUser/getUsers",params);
      },

      /**
       * 修改用户状态
       * @param status
       * @param scope
       */
      changeUserStatus(status,scope){
        let userId = scope.row.userId;
        this.$store.dispatch("AdminUser/saveUserStatus",{
          userId: userId,
          userStatus: status
        }).then(res=>{

        },err=>{
          scope.row['userStatus'] = !scope.row['userStatus'];
        })
      },

      /**
       * 保存用户信息
       * @param row
       */
      saveUserInfo(row){
        let params = {
          userId: row.userId,
          userName: row.userName,
          userNick: row.userNick,
          userEmail: row.userEmail,
          userPassword: this.userNewPassword,
          userStatus: row.userStatus,
          userOp: row.userOp
        }
        this.$store.dispatch("AdminUser/saveUserInfo",params).then(res=>{
          this.$message.success("修改成功");
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .UserList {

  }
</style>
