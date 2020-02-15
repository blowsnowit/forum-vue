<template>
  <ul class="List">
    <li v-for="item in datas" class="item" :class="type">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "List",
    props: {
      datas: {
        type: Array,
        default: ()=>[]
      },
      type: {
        type: String,
        default: "skin"
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.List {
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    padding: 10px 10px;
    border-bottom: 1px solid var(--gray-dark);
    position: relative;
  }
  > li.skin:hover{
    background-color: var(--skin);
    color: var(--skin-font);
  }
}
</style>
