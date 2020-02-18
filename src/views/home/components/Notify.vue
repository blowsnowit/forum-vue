<template>
  <div class="Notify">
    <el-popover
      placement="bottom"
      popper-class="notify-popper"
      width="300"
      trigger="hover">
      <template slot="reference">
        <el-badge is-dot :hidden="unReadNotifyNum === 0" class="item" style="display: inline;">
          <slot name="reference"></slot>
        </el-badge>
      </template>
      <list class="notify-list" :datas="notifys">
        <div slot-scope="{item}" class="read-status" :class="item.isRead === 1 ?'read':'noread'" @click="goNotify(item)">
          <!--article/comment/notice-->
          <!--文章-->
          <template v-if="item.targetType === 'article'">
            <span class="type">
              [文章]
            </span>
            <span class="desc">
              {{item.targetData.userDTO.userNick}} 发布了 <{{item.targetData.articleTitle}}>
            </span>
          </template>

          <!--评论-->
          <template v-else-if="item.targetType === 'comment'">
            <span class="type">
              [评论]
            </span>
            <span class="desc">
              {{item.targetData.articleComments[0].userDTO.userNick}} 评论了 {{item.targetData.articleComments[0].articleComment}}
            </span>
          </template>

          <!--公告-->
          <template v-else-if="item.targetType === 'notice'">
            <span class="type">
              [公告]
            </span>
            <span class="desc">
              {{item.content}}
            </span>
          </template>

          <template v-else-if="item.targetType === 'system'">
            <span class="type">
              [通知]
            </span>
            <span class="desc">
              {{item.content}}
            </span>
          </template>

          <template v-else>
            <span class="type">
              [其他]
            </span>
            <span class="desc">
              {{item.content}}
            </span>
          </template>
        </div>
      </list>
      <footer>
        <page ref="page" :size="6" @change="getNotifys" style="float: left;padding: 5px;" :layout="'prev, next'"></page>
        <el-button style="float: right;margin: 10px;"
                   icon="el-icon-check" class="my-button-style-skin" size="mini" type="primary" @click="readAllNotify">全部标记为已读</el-button>
        <el-button style="float: right;margin: 10px 0;"
                   icon="el-icon-setting" class="my-button-style-skin" size="mini" type="primary" @click="goNotifyConfig"></el-button>
      </footer>
    </el-popover>
  </div>
</template>

<script type="text/ecmascript-6">
  import UserInfoShowCard from "./UserInfoShowCard";
  import List from "../../../components/List";
  import Page from "../../../components/Page";
  export default {
    name: "Notify",
    components: {Page, List, UserInfoShowCard},
    data() {
      return {
        activeName: 'first',

        notifys: [],
      }
    },
    computed:{
      unReadNotifyNum(){
        return this.$store.getters['getUnReadNotifyNum'];
      },

    },
    mounted(){
      this.getNotifys();
    },
    methods: {
      /**
       * 获取消息列表
       */
      getNotifys(){
        let params = this.$refs.page.getPage();
        this.$store.dispatch('Notify/getNotifys',params).then(res=>{
          this.notifys = res.data.records;
          this.$refs.page.setPage(res.data);
          //初始化未读数量
          this.$store.commit("SET_UN_READ_NOTIFY_NUM",res.data.others);
        })
      },

      /**
       * 前往对应通知的地址
       * @param item
       */
      goNotify(item){
        console.log('goNotify',item);
        //判断是否已读
        if (item.isRead === 0){
          this.readNotify(item.userNotifyId);
        }
        //判断前往地址
        switch (item.targetType) {
          case 'article':
            this.$router.push({
              path: "/article/" + item.targetData.articleId
            })
            break;
          case 'comment':
            this.$router.push({
              path: "/article/" + item.targetData.articleId,
              query:{
                commentId: item.targetData.articleComments[0].articleCommentId
              }
            })
            break;
        }
      },

      /**
       * 读取指定消息
       */
      readNotify(notifyId){
        this.$store.dispatch("Notify/readNotify",notifyId).then(res=>{
          this.getNotifys();
        })
      },

      /**
       * 已读所有消息
       */
      readAllNotify(){
        this.$store.dispatch("Notify/readAllNotify").then(res=>{
          this.getNotifys();
        })
      },


      /**
       * 前往通知配置页面
       */
      goNotifyConfig(){
        this.$router.push({
          path: "/user/"  + this.$store.getters['User/getUserInfo'].userId,
          query:{
            type: "notifyConfig"
          }
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .Notify {


  }
  .notify-popper{
    padding: 0;
    .notify-list{
      > li{
        cursor: pointer;
        .desc{
          margin-left: 10px;
        }
        .read-status.noread{

        }
        .read-status.read{
          color: var(--gray);
        }
      }
      > li:hover{
        .title{
          color: #fff;
        }
      }
    }
  }
</style>
