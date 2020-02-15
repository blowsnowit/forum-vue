<template>
  <div class="AdminSet">
    <el-tabs class="my-el-tabs" v-model="activeName">
      <el-tab-pane v-for="key in Object.keys(configs)" :key="key" :label="key" :name="key">
        <!--{{configs[key]}}-->
        <el-form label-position="left" inline class="set-form">

          <el-form-item v-for="(config,index) in configs[key]" :key="index" :label="config.configInputTip">
            <!--输入类型,text,number,textarea,boolean-->
            <template v-if="config.configInputType === 'text'">
              <el-input size="mini" v-model="config.configValue"></el-input>
            </template>
            <template v-else-if="config.configInputType === 'number'">
              <el-input-number size="mini" v-model="config.configValue"></el-input-number>
            </template>
            <template v-else-if="config.configInputType === 'textarea'">
              <el-input :rows="4" type="textarea" size="mini" v-model="config.configValue"></el-input>
            </template>
            <template v-else-if="config.configInputType === 'editor'">
              <editor :key="'confg_' + index" :line-numbers="false" :show-tools="false" v-model="config.configValue"></editor>
            </template>
            <template v-else-if="config.configInputType === 'checkbox'">
              <el-checkbox v-model="config.configValue" true-label="true" false-label="false"></el-checkbox>
            </template>
            <template v-else-if="config.configInputType === 'password'">
              <el-input size="mini" type="password" show-password  v-model="config.configValue"></el-input>
            </template>


            <template v-else>
              <el-input size="mini" v-model="config.configValue"></el-input>
            </template>
          </el-form-item>


          <el-form-item>
            <el-button size="mini" class="my-button-style-skin" @click="saveConfigs(configs[key])">保存</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import Editor from "../../components/Editor";
  export default {
    name: "AdminSet",
    components: {Editor},
    data() {
      return {
        activeName: null,
        configs: []
      }
    },
    mounted(){
      this.getConfigs().then(()=>{
        this.activeName = Object.keys(this.configs)[0];
      });
    },
    methods: {
      getConfigs() {
        return this.$store.dispatch("AdminConfig/getConfigs").then(res=>{
          this.configs = res.data;
        })
      },
      saveConfigs(configs){
        let params = configs;
        console.log(params);
        this.$store.dispatch("AdminConfig/saveConfigs",params).then(res=>{
          this.$message.success("修改成功");
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .AdminSet {
    padding: 10px;
    .set-form {
      font-size: 0;
    }
    .set-form label {
      width: 100%;
      color: var(--gray);
    }
    .set-form .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
      .el-form-item__content{
        min-width: 100px;
        max-width: 100%;
      }
    }

  }
  .admin-layout.mobile-mode{
    .AdminSet {
      .set-form .el-form-item {
        width: 100%;
      }
    }
  }
</style>
