<template>
  <div class="Editor">
    <ul v-if="showTools" class="tools" :class="active ? 'disabled': ''">
      <li>工具栏：</li>
      <li @click="insertContent('# ')" title="标题" >H</li>
      <li @click="insertContent('**文本**')" title="粗体" style="font-weight: bold;">B</li>
      <li @click="insertContent('*文本*')" title="斜体" style="font-style: italic;">I</li>
      <li @click="insertContent('~~文本~~')" title="删除线" style="text-decoration: line-through;">S</li>
      <li @click="insertContent('[文本](URL)')" title="链接">A</li>
      <li><i class="el-icon-picture-outline" title="图片"></i></li>
      <li @click="insertContent('```\n' + '\n' + '```')" title="代码块">{}</li>
      <li @click="insertContent('#话题# ')" title="话题">#</li>
      <li style="right: 0;position: absolute;">
        <el-popover
          placement="bottom"
          trigger="click">
          <el-tree
            class="filter-tree"
            :data="menus"
            :props="menuProps"
            default-expand-all
            @node-click="menuTreeClick"
            ref="tree">
          </el-tree>
          <i slot="reference" @click="getMdMenu" class="el-icon-reading" style="margin-right: 10px;"></i>
        </el-popover>
        <el-switch
          class="my-el-switch"
          v-model="active"
          active-text="预览">
        </el-switch>
      </li>
    </ul>
    <div class="markdown-body" v-show="active" v-html="contentRender">
    </div>
    <codemirror
      v-show="!active"
      ref="editor"
      v-model="content"
      :options="cmOptions"
      class="code">
    </codemirror>
  </div>
</template>

<script type="text/ecmascript-6">
  import { codemirror } from 'vue-codemirror'

  export default {
    name: "Editor",
    components:{
      codemirror
    },
    data() {
      return {
        content: null,
        contentRender: null,
        cmOptions: {
          value:'',
          mode: 'markdown',
          theme: "default",
          lineNumbers: true,
          lineWrapping: true,  // 长句子折行
          highlightFormatting: true,
          extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},
          placeholder: "请输入文章内容",
          tabSize: 2, // tab
          styleActiveLine: true, // 高亮选中行
          matchTopics: this.matchTopics
        },
        menus: [],
        menuProps:{
          children: 'children',
          label: 'name'
        }
      }
    },
    props:{
      value: String,
      active: {
        type: Boolean,
        default: false
      },
      showTools: {
        type: Boolean,
        default: true
      },
      matchTopics: {
        type: Function,
        default: (result)=>{}
      }
    },
    mounted(){
      this.content = this.value;
      if (this.active){
        this.renderMd();
      }
    },
    watch: {
      value(val){
        this.content = val;
      },
      content(val){
        this.$emit('input',val)
        if (this.active){
          this.renderMd();
        }
      },
      active(val){
        if (val){
          this.renderMd()
        }
      }
    },
    methods: {
      insertContent(content) {
        let cm = this.$refs.editor.codemirror;
        cm.replaceSelection(content);
      },
      //修改编辑方式
      renderMd(){
        let md = require('../utils/markdownit').default;
        this.contentRender = md.render(this.content);


      },
      menuTreeClick(data,node){
        window.location.hash = data.id;
      },

      //获取md目录
      getMdMenu(maxLevel=null){
        //覆盖一行一行匹配
        let reg = /^\s*(#+)\s+(.*)[\s]*/gm;
        let result = this.content.match(reg);
        console.log(result);
        if (!result){
          return [];
        }
        let menus = [];
        let nums = {};

        let index = 0;
        for (let value of result){
          value = value.replace(/^\s*[^#]/,'');
          value = value.replace(/\s*$/,'');
          //确定级别
          let arr = value.split('#');
          let level = arr.length - 1;
          //验证是否到达最大级别
          if (maxLevel != null && level > maxLevel) continue;

          let data = {
            index: level === 1 ? ++index : index,
            level: level,
            name: value.replace(/^\s*#+\s*/,''),
            children: []
          }
          //id用于跳转
          let id = "menu-" + data.index + "-";
          if (level === 1){
            //同时要给元素加id=
            id += level + "-" + (menus.length + 1);
            data.id = id;
            menus.push(data);
          }else{
            let lastMenu = this.getLastMenuByLevel(menus,level - 1);
            if (!lastMenu) continue;
            id += level + "-" + (lastMenu.children.length + 1);
            data.id = id;
            lastMenu.children.push(data);
          }
          nums[level] = nums[level] ? nums[level] : 0;
          //给元素添加id
          let node = $(".markdown-body h" + level).eq(nums[level]++);
          $(node).attr("id",id);
        }
        this.menus = menus;
        return menus;
      },
      getLastMenuByLevel(menus,level){
        let lastMenu = menus[menus.length - 1];
        if (lastMenu.level === level){
          return lastMenu;
        }else{
          if (lastMenu.children.length === 0){
            return lastMenu;
          }
          return this.getLastMenuByLevel(lastMenu.children,level);
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.Editor {
  .tools{
    position: relative;
    font-size: 15px;
    margin: 0;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    border-bottom: 1px solid #ebeef5;
    padding-right: 140px;

    li + li{
      margin: 0 10px;
      cursor: pointer;
    }
  }
}
</style>