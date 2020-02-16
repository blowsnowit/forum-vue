<template>
  <div class="UserInfo">
    <el-card class="box-card">
      <user-info-card :userId="userId" ref="userInfoCard" easy></user-info-card>
      <el-tabs class="my-el-tabs" v-model="activeName" >
        <el-tab-pane label="文章列表" name="article">
          <article-card v-for="(item,index) in datas" :article="item" easy :key="index"></article-card>
          <page ref="page" @change="list"></page>
        </el-tab-pane>
        <template v-if="isMy">
          <el-tab-pane label="个人设置" name="setting">
            <el-form ref="settingForm" :model="settingForm" :rules="settingFormRules" label-width="120px">
              <el-row :gutter="10">
                <el-col :md="10">
                  <el-form-item label="用户名：">
                    {{userInfo.userName}}
                  </el-form-item>
                  <el-form-item label="用户头像：" prop="userFace">
                    <el-avatar :size="60" :src="settingForm.userFace"></el-avatar>
                    <input style="opacity:0;width:100%;height:100%;position:absolute;top:0;left:0"  type="file" @change="fileUpload">
                  </el-form-item>
                  <el-form-item label="用户昵称：" prop="userNick">
                    <el-input  v-model="settingForm.userNick"></el-input>
                  </el-form-item>
                  <el-form-item label="用户签名：">
                    <el-input :rows="4" type="textarea" v-model="settingForm.userDesc"></el-input>
                  </el-form-item
                  >
                </el-col>
              </el-row>
              <el-form-item>
                <el-button class="my-button-style-skin"  @click="updateUserInfo">修  改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="密码安全" name="password">
            <el-form ref="passwordForm" :model="passwordForm" :rules="passwordFormRules" label-width="120px">
              <el-row :gutter="10">
                <el-col :md="10">
                  <el-form-item label="原密码：" prop="oldUserPassword">
                    <el-input type="password" show-password v-model="passwordForm.oldUserPassword"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码：" prop="newUserPassword">
                    <el-input type="password" show-password v-model="passwordForm.newUserPassword"></el-input>
                  </el-form-item>
                  <el-form-item label="确认新密码：" prop="confirmNewUserPassword">
                    <el-input type="password" show-password v-model="passwordForm.confirmNewUserPassword"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button class="my-button-style-skin" @click="updateUserPassword">修  改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="邮箱安全" name="email">
            <el-form ref="emailForm" :model="emailForm" :rules="emailFormRules" label-width="120px">
              <el-row :gutter="10">
                <el-col :md="10">
                  <el-form-item label="原密码：" prop="oldUserPassword">
                    <el-input type="password" show-password v-model="emailForm.oldUserPassword"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱号：" prop="email">
                    <el-input type="email" v-model="emailForm.email"></el-input>
                  </el-form-item>
                  <template>
                    <el-form-item label="图形验证码：">
                      <el-input class="no-append-padding" type="email" v-model="code" >
                        <captch v-if="activeName === 'email'" slot="append" style="width: 70px;" v-model="token"></captch>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="邮箱验证码：" prop="emailCode">
                      <el-input type="email" v-model="emailForm.emailCode">
                        <el-button  slot="append" @click="sendEmailCode" :disabled="codeSeconds > 0">
                          {{codeSeconds > 0 ? codeSeconds : '发送'}}
                        </el-button>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button class="my-button-style-skin" @click="updateUserEmail">修  改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="通知设置" name="notifyConfig">
            <el-form ref="notifyConfigForm" label-width="120px">
              <el-row :gutter="10">
                <el-col :md="10">
                  <el-form-item v-for="(notifyConfig,index) in notifyConfigs" :key="index" :label="notifyConfig.userNotifyConfigName + '：'">
                    <el-checkbox v-model="notifyConfig.userNotifyConfigNotify" :true-label="1" :false-label="0">站内信</el-checkbox>
                    <el-checkbox v-model="notifyConfig.userNotifyConfigEmail" :true-label="1" :false-label="0">邮件</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button class="my-button-style-skin" @click="saveNotifyConfigs">修  改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import UserInfoCard from "./components/UserInfoCard";
  import Article from "./Article";
  import ArticleCard from "./components/ArticleCard";
  import Page from "../../components/Page";
  import Captch from "../../components/Captch";
  export default {
    name: "UserInfo",
    components: {Captch, Page, ArticleCard, Article, UserInfoCard},
    data() {
      return {
        activeName: 'article',
        datas: [],
        userId: null,

        settingForm:{
          userFace: null,
          userNick: null,
          userDesc: null
        },
        settingFormRules: {
          userNick: [
            { required: true, message: '用户昵称不能为空', trigger: 'blur' }
          ],
          userFace: [
            { required: true, message: '用户头像不能为空', trigger: 'blur' }
          ]
        },

        passwordForm:{
          oldUserPassword: null,
          newUserPassword: null,
          confirmNewUserPassword: null
        },
        passwordFormRules: {
          oldUserPassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' }
          ],
          newUserPassword: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          confirmNewUserPassword: [
            { required: true, message: '确认新密码不能为空', trigger: 'blur' }
          ]
        },

        emailForm:{
          oldUserPassword: null,
          email: null,
          emailCode: null
        },
        emailFormRules: {
          oldUserPassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          emailCode: [
            { required: true, message: '邮箱验证码不能为空', trigger: 'blur' }
          ]
        },
        code: null,
        token: null,
        codeSeconds: 0,

        notifyConfigs: []
      }
    },
    computed:{
      userInfo(){
        return this.$store.getters['User/getUserInfo'];
      },
      isMy(){
        return this.userInfo && this.userInfo.userId === this.userId;
      }
    },
    watch:{
      "$route.query"(){
        if (this.$route.query.type){
          this.activeName = this.$route.query.type;
        }else{
          this.activeName = "article";
        }
      },
      "$route.params"(){
        this.initUserId();
      }
    },
    mounted(){
      if (this.$route.query.type){
        this.activeName = this.$route.query.type;
      }
      this.initUserId();
    },
    methods: {
      initUserId(){
        this.userId = parseInt(this.$route.params.userId) || this.userInfo.userId;
        if (this.userInfo){
          this.settingForm.userNick = this.userInfo.userNick;
          this.settingForm.userDesc = this.userInfo.userDesc;
          this.settingForm.userFace = this.userInfo.userFace;

          this.emailForm.email = this.userInfo.userEmail;

          this.getNotifyConfigs();
        }
        this.list();
      },
      list(){
        let params = this.$refs.page.getPage();
        params.search = this.searchWord;
        params.userId = this.userId;
        this.$store.dispatch('Article/getArticles',params).then(res=>{
          this.datas = res.data.records;
          this.$refs.page.setPage(res.data);
        })
      },
      updateUserInfo(){
        this.$refs.settingForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('User/updateUserInfo',this.settingForm).then(res=>{
              //更新用户资料
              this.$store.commit("User/UPDATE_USERINFO",this.settingForm);
              this.$refs.userInfoCard.getUserInfoById(this.userInfo.userId);
            })
          }
        });

      },
      updateUserPassword(){
        this.$refs.passwordForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('User/updateUserPassword',this.passwordForm).then(res=>{
              this.$store.commit("User/LOGOUT");
              this.$router.push({
                path: '/',
                query: {needlogin: true}
              })
            })
          }
        });
      },
      updateUserEmail(){
        this.$refs.emailForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('User/updateUserEmail',this.emailForm).then(res=>{
              //更新用户资料
              this.$store.commit("User/UPDATE_USERINFO",this.settingForm);
              this.$refs.userInfoCard.getUserInfoById();
            })
          }
        });
      },
      sendEmailCode(){
        if (!this.emailForm.email){
          this.$message.error('请先填写邮箱地址');
          return;
        }
        if (!this.code){
          this.$message.error('请先填写图形验证码');
          return;
        }
        let params = {
          email: this.emailForm.email,
          code: this.code,
          token: this.token,
          templateName: "mail_template_edit"
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
      },

      /**
       * 获取通知配置列表
       */
      getNotifyConfigs(){
        this.$store.dispatch('NotifyConfig/getNotifyConfigs').then(res=>{
          this.notifyConfigs = res.data;
        })
      },
      /**
       * 保存通知配置列表
       */
      saveNotifyConfigs(){
        this.$store.dispatch('NotifyConfig/saveNotifyConfigs',this.notifyConfigs).then(res=>{
          this.$message.success("修改成功");
        })
      },
      //文件上传
      fileUpload(e){
        let files = e.target.files;
        if (files.length === 0){
          this.$message.info("请选择图片");
          return;
        }
        let file = files[0];
        this.$store.dispatch("uploadImage",file).then(res=>{
          this.settingForm.userFace = res.data;
        })
        console.log('fileUpload',file);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.UserInfo {

}
</style>
