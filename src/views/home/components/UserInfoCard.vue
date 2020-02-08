<template>
  <el-card class="user-info-card" :class="easy?'easy':''">
    <div class="user-info-box" slot="header">
      <el-avatar :size="60" :src="user.userFace"></el-avatar>
      <div class="box">
        <div class="nick">{{user.userNick}}</div>
        <div class="desc">{{user.userDesc || '用户还没有签名...'}}</div>
        <div class="time">{{user.userAddTime}}加入</div>
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
      userId: Number
    },
    watch:{
      userId(){
        this.getUserInfoById(this.userId);
      }
    },
    methods: {
      getUserInfoById(userId) {
        if (userId == null){
          userId = this.$store.getters['User/getUserInfo'].userId;
        }
        this.$store.dispatch('User/getUserInfo',userId).then(res=>{
          this.user = res.data;
        })
      }
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
      .desc,.time{
        color: #b5b5b5;
        font-size: 10px;
        word-break: break-all;
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
