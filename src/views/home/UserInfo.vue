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
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <el-avatar :size="60" :src="settingForm.userFace"></el-avatar>
                    </el-upload>
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
  export default {
    name: "UserInfo",
    components: {Page, ArticleCard, Article, UserInfoCard},
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
        }
      }
    },
    computed:{
      userInfo(){
        return this.$store.getters['User/getUserInfo'];
      },
      isMy(){
        return this.userInfo.userId === this.userId;
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
        this.settingForm.userNick = this.userInfo.userNick;
        this.settingForm.userDesc = this.userInfo.userDesc;
        this.settingForm.userFace = this.userInfo.userFace;
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
              this.$refs.userInfoCard.getUserInfoById();
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

      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.UserInfo {
  .user-info-box{
    padding: 20px 0!important;
  }
}
</style>
