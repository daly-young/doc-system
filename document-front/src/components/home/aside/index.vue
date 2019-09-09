<template>
  <el-aside width="200px">
    <template v-if="sideCategory&&sideCategory.children.length">
      <tree-menus :data="sideCategory.children" :curCateKey="highlightKey"></tree-menus>
    </template>
    <p v-else>暂无层级</p>
  </el-aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import treeMenus from './aside-menu'
export default {
  data() {
    return {
      highlightKey: ''
    }
  },
  components: {
    treeMenus
  },
  computed:{
    ...mapState( {
      sideCategory: state => state.sideCategory,
      sideCategoryActiveIndex: state => state.sideCategoryActiveIndex,
      curCateKey: state => state.curCateKey
    } )
  },
  watch:{
    sideCategory( newVal ) {
      console.log( newVal, '====newCate' )
      if( newVal ) {
        this.highlightKey = this.curCateKey
        console.log( this.highlightKey, '=====' )
      }
    }
  },
  methods: {
    ...mapMutations( [
      'updateData'
    ] ),
    // 提交所选条目index
    selectFn( index ) {
      this.updateData( { selectIndex: index } )
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
