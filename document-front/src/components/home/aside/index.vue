<template>
  <el-aside width="200px">
    <template v-if="sideCategory&&sideCategory.children.length">
      <el-menu 
        background-color="transparent" 
        text-color="#999" 
        active-text-color="#409EFF" 
        :default-active="sideCategoryActiveIndex" 
        menu-trigger="click" 
        :unique-opened="true"
        @select="selectFn"
        id="demo">
        <tree-menus 
          v-for="(item,index) in sideCategory.children"
          :key="item.id"
          :item="item"
          :index="index.toString()"
        ></tree-menus>
      </el-menu>
    </template>
    <p v-else>暂无层级</p>
  </el-aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import treeMenus from './aside-menu'
export default {
  components: {
    treeMenus
  },
  computed:{
    ...mapState({
      sideCategory: state => state.sideCategory,
      sideCategoryActiveIndex: state => state.sideCategoryActiveIndex
    })
  },
  watch:{},
  methods: {
    ...mapMutations([
      'updateData'
    ]),
    // 提交所选条目index
    selectFn(index) {
      this.updateData({ selectIndex: index })
    },
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100%;
  overflow-y: auto;
}
.el-menu {
  text-align: left;
  border: none;
  :hover {
    background-color: #fff!important;
  }
}
.el-menu-item {
  padding-left: 0!important;
}
</style>
