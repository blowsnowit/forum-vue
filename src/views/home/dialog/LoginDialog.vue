<template>
  <div class="login-dialog">
    <el-dialog
      title="登入"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      custom-class="my-el-dialog"
      width="20%">
      <el-form ref="form" :model="form" :rules="formRules">
        <el-form-item prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" show-password v-model="form.password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-button style="width: 100%;" class="my-button-style-skin" @click="submit">开始登入</el-button>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <a href="javascript:;" @click="openFind">忘记密码</a>
        <div class="register-tip">
          <span style="color: #000;">还没有注册？</span>
          <a href="javascript:;" @click="openRegister">注册</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "LoginDialog",
    data() {
      return {
        dialogVisible: false,
        form:{
          userName: null,
          password: null
        },
        formRules:{
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      open() {
        this.dialogVisible = true;
      },
      close(){
        this.dialogVisible = false;
      },

      submit(){
        this.$refs.form.validate((valid) => {
          if (valid){
            let params = this.form;
            this.$store.dispatch("User/login",params).then(res=>{
              this.$store.commit('User/LOGIN',res.data);
              this._refreshPage();
              this.close();
            })
          }
        })
      },

      openRegister(){
        this.close();
        this.$parent.openRegisterDialog();
      },
      openFind(){
        this.close();
        this.$parent.openFindDialog();
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.login-dialog {

}
.home-manager.mobile{
  .login-dialog .el-dialog{
    width: 80%!important;
  }
}
</style>
