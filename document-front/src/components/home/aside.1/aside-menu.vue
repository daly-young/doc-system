<template id="item-template">
  <div>
    <!-- 如果还有子集 -->
    <el-submenu 
      v-if="isFolder" 
      :index="index" 
      :popper-append-to-body="true">
      <template slot="title">{{ item.label }}</template>
      <tree-menus
        class="item"
        v-for="(child, i) in item.children"
        :key="child.id"
        :item="child"
        :index="index+'-'+ i"
      ></tree-menus>
    </el-submenu >
    <!-- 没有子集 -->
    <el-menu-item 
      v-else
      :index="index"
      @click="getArticle">
      {{ item.label }}
    </el-menu-item >
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'treeMenus',
  props:{
    item: Object,
    index: String
  },
  mounted(){
    // 初始化提交激活,如果提交过，就不用再提交了，只需要第一条
    if(!this.isFolder&&!this.sideCategoryActiveIndex) {
      this.updateSideActive({
        sideCategoryActiveIndex: this.index,
      })
      this.getArticle()
    }
  },
  computed: {
    // 是否含有子集
    isFolder () {
      return this.item.children &&
        this.item.children.length
    },
    ...mapState({
      sideCategoryActiveIndex: state => state.sideCategoryActiveIndex
    })
  },
  methods: {
    ...mapMutations([
      'updateData',
      'updateSideActive'
    ]),
    // 上传操作文章ID，并请求文章
    getArticle() {
      this.updateData({
        articleId: this.item.article_id
      })
      this.$store.dispatch('getArticle')
    },
  }
}
</script>




