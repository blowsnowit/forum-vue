<template>
  <el-card class="user-info-card" :class="easy?'easy':''">
    <div class="user-info-box" slot="header">
      <a href="javascript:;" @click="goUserPage">
        <el-avatar :size="60" :src="user.userFace" ></el-avatar>
      </a>
      <div class="box">
        <div class="nick" @click="goUserPage">{{user.userNick}}</div>
        <div class="desc">{{user.userDesc || '用户还没有签名...'}}</div>
        <div class="time" >
          <span :title="user.userAddTime">{{$utils.quickTimeago(user.userAddTime)}}加入</span>
          <span class="user-online-status" :class="user.isOnline?'online':''"> {{user.isOnline?'在线':'离线'}}</span>
        </div>
      </div>
    </div>
    <el-row v-if="!easy" class="total-box" style="text-align: center;">
      <el-col :span="8" style="text-align: center;">
        <div class="name">文章数</div>
        <div class="num">1</div>
      </el-col>
      <el-col :span="8" style="text-align: center;">
        <div class="name">收藏数</div>
        <div class="num">1</div>
      </el-col>
      <el-col :span="8" style="text-align: center;">
        <div class="name">关注数</div>
        <div class="num">1</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "UserInfoCard",
    data() {
      return {
        user: {
          userNick: null,
          userFace: null,
          userDesc: null,
          userAddTime: null
        }
      }
    },
    props:{
      easy: Boolean,
      userId: Number,
      userDTO: Object
    },
    watch:{
      userId(){
        this.getUserInfoById(this.userId);
      }
    },
    mounted(){
      if (this.userDTO){
        this.user = this.userDTO;
      }
    },
    methods: {
      getUserInfoById(userId) {

        this.$store.dispatch('User/getUserInfo',userId).then(res=>{
          this.user = res.data;
        })
      },
      //去指定用户的用户页面
      goUserPage() {
        this.$router.push({
          path: "/user/" + this.user.userId
        })
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.user-info-card.easy{
  box-shadow: unset;
  border: unset;
  .user-info-box{
    padding: 0;
  }
}

.user-info-card {
  .el-card__header{
    padding: 0;
  }
  .el-card__body{
    padding: 0;
  }
  .user-info-box{
    display: flex;
    padding: 20px;
    .box{
      flex: 1;
      margin-left: 10px;
      font-size: 18px;
      line-height: 20px;
      .nick{
        cursor: pointer;
      }
      .desc,.time{
        color: #b5b5b5;
        font-size: 10px;
        word-break: break-all;
      }
      .user-online-status{
        margin: 0 10px;
      }
      .user-online-status:before{
        content: '';
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
        background: var(--gray);
      }
      .user-online-status.online:before{
        background: var(--skin-success);
      }

    }
  }
  .total-box{
    padding: 20px;
    .name{

    }
    .num{
      font-weight: bold;
    }
  }
}
</style>
