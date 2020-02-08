<template>
  <div class="tab-component">
    <ul>
      <li v-for="item in list" @click="clickHandler(item)" :class="{'active': active === item[valueName]}">{{item[labelName]}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "TabComponent",
    props:{
      list: Array,
      value: String,
      labelName:{
        type: String,
        default: "label"
      },
      valueName:{
        type: String,
        default: "value"
      }
    },
    data() {
      return {
        active: null
      }
    },
    watch:{
      value(val){
        this.active = val;
      }
    },
    mounted(){
      this.active = this.value;
    },
    methods: {
      clickHandler(item) {
        this.active = item[this.valueName];
        this.$emit('change',item);
        this.$emit('input',this.active);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tab-component {
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li{
      font-size: 14px;
      line-height: 14px;
      padding: 5px 8px;
      margin: 0 5px;
      cursor: pointer;
    }
    li.active{
      background: var(--skin);
      color: var(--skin-font);
    }
  }
}
</style>
