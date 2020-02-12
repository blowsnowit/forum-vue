<template>
  <div class="find-dialog">
    <el-dialog
      title="找回"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      custom-class="my-el-dialog"
      width="20%">
      <template v-if="findData == null">
        <el-form ref="form" :model="form" :rules="formRules">
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="请输入绑定的邮箱号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password v-model="form.password" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input type="password" show-password v-model="form.confirmPassword" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="no-append-padding" type="email" v-model="code" placeholder="图形验证码">
              <captch slot="append" style="width: 70px;" v-model="token"></captch>
            </el-input>
          </el-form-item>
          <el-form-item prop="emailCode">
            <el-input type="email" v-model="form.emailCode" placeholder="邮箱验证码">
              <el-button slot="append" @click="sendEmailCode" :disabled="codeSeconds > 0">
                {{codeSeconds > 0 ? codeSeconds : '发送'}}
              </el-button>
            </el-input>
          </el-form-item>
          <el-button style="width: 100%;" class="my-button-style-skin" @click="submit">找回密码</el-button>
        </el-form>
        <div slot="footer" style="text-align: center;">
          <div class="register-tip">
            <span style="color: #000;">已有账号？</span>
            <a href="javascript:;" @click="openLogin">登录</a>
          </div>
        </div>
      </template>
      <template v-else>
        <el-form>
          <el-form-item label="账号：">
            {{findData.userName}}
          </el-form-item>
          <el-form-item label="密码：">
            {{form.password}}
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: center;">
          <div class="tip">
            注意：本信息只显示一次，请记住账号密码
          </div>
          <div class="register-tip">
            <a href="javascript:;" @click="openLogin">> 登录</a>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Captch from "../../../components/Captch";
  export default {
    name: "FindDialog",
    components: {Captch},
    data() {
      return {
        dialogVisible: false,
        form:{
          userEmail: null,
          password: null,
          confirmPassword: null,
          email: null,
          emailCode: null
        },
        formRules:{
          password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '确认新密码不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          emailCode: [
            { required: true, message: '邮箱验证码不能为空', trigger: 'blur' }
          ],
        },
        code: null,
        token: null,

        codeSeconds: 0,


        findData: null
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
          if (valid) {
            let params = this.form;
            this.$store.dispatch("User/find",params).then(res=>{
              this.$message.success("找回成功");
              this.findData = res.data;
            })
          }
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
          templateName: "mail_template_find"
        }
        this.$store.dispatch('sendEmailCode',params).then(res=>{
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
.find-dialog {
  .tip{
    color: red;
    font-size: 11px;
  }
}
</style>
