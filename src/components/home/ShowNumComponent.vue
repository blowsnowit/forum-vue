<template>
  <div class="show-num-component" :class="type">
    <div class="title">
      <slot></slot>
    </div>
    <div class="num">
      <slot name="num">
        {{num}}
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "ShowNumComponent",
    props:{
      num: Number | String,
      type: String
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.show-num-component {
  cursor: pointer;
  background: var(--skin);
  color: var(--skin-font);
  border: 1px solid var(--skin);
  display: inline-block;
  > div{
    display: inline-block;
    padding: 5px 10px;
  }
  .num{
    background: var(--skin-font);
    color: var(--skin);
  }
}


.show-num-component.info{
  background: var(--skin-info);
  border: 1px solid var(--skin-info);
}
.show-num-component.success{
  background: var(--skin-success);
  border: 1px solid var(--skin-success);
}
.show-num-component.warning{
  background: var(--skin-warning);
  border: 1px solid var(--skin-warning);
}
.show-num-component.danger{
  background: var(--skin-danger);
  border: 1px solid var(--skin-danger);
}
</style>
