<template>
  <div class="register-dialog">
    <el-dialog
      title="注册"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      custom-class="my-el-dialog"
      width="20%">
      <el-form ref="form" :model="form" >
        <el-form-item>
          <el-input v-model="form.userName" placeholder="请输入用户账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" show-password v-model="form.password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" show-password v-model="form.confirmPassword" placeholder="请再次输入用户密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="email" v-model="form.email" placeholder="邮箱号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="no-append-padding" type="email" v-model="code" placeholder="图形验证码">
            <captch slot="append" style="width: 70px;" v-model="token"></captch>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="email" v-model="form.emailCode" placeholder="邮箱验证码">
            <el-button slot="append" @click="sendEmailCode" :disabled="codeSeconds > 0">
              {{codeSeconds > 0 ? codeSeconds : '发送'}}
            </el-button>
          </el-input>
        </el-form-item>
        <el-button style="width: 100%;" class="my-button-style-skin" @click="_register">开始注册</el-button>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <div class="register-tip">
          <span style="color: #000;">已有账号？</span>
          <a href="javascript:;" @click="openLogin">登录</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Captch from "../../../components/Captch";
  export default {
    name: "RegisterDialog",
    components: {Captch},
    data() {
      return {
        dialogVisible: false,
        form:{
          userName: null,
          password: null,
          confirmPassword: null,
          email: null,
          emailCode: null
        },
        code: null,
        token: null,

        codeSeconds: 0
      }
    },
    methods: {
      open() {
        this.dialogVisible = true;
      },
      close(){
        this.dialogVisible = false;
      },

      _register(){
        let params = this.form;
        this.$store.dispatch("User/register",params).then(res=>{
          this.$message.success("注册成功");
          this.openLogin();
        })
      },

      openLogin(){
        this.close();
        this.$parent.openLoginDialog();
      },
      sendEmailCode(){
        if (!this.form.email){
          this.$message.error('请先填写邮箱地址');
          return;
        }
        if (!this.code){
          this.$message.error('请先填写图形验证码');
          return;
        }
        let params = {
          email: this.form.email,
          code: this.code,
          token: this.token,
          templateName: "mail_template_register"
        }
        this.$store.dispatch('User/sendEmailCode',params).then(res=>{
          this.$message.success('发送邮件验证码成功');
          //邮箱验证码发送倒计时
          this.codeSeconds = 60;
          let timer = setInterval(()=>{
            this.codeSeconds--;
            if (this.codeSeconds === 0){
              clearInterval(timer);
            }
          },1000);
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.register-dialog {

}
</style>
