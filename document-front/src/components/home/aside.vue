<template>
  <el-aside width="200px">
    <!-- <template v-if="treeList.length">
      <tree-menus :data="treeList" :curTreeKey="highlightKey"></tree-menus>
    </template> -->
    <el-tree 
      v-if="treeList.length"
      :data="treeList" 
      node-key="id"
      @node-click="handleNodeClick"
      highlight-current
      default-expand-all
      :expand-on-click-node="false"
      ref="tree"
    ></el-tree>
    <p v-else>暂无层级</p>
  </el-aside>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { setTimeout } from 'timers';
// import treeMenus from './aside-menu'
export default {
  data() {
    return {
      highlightKey: '',
      treeList: []
    }
  },
  components: {
    // treeMenus
  },
  computed:{
    ...mapState( {
      tree: state => state.tree,
      menu: state => state.menu,
    } ),
    activeTreeId() {
      return this.tree.activeTreeId
    }
  },
  watch:{
    menu: {
      handler( newVal ) {
        console.log( newVal, '====menu watch' )
        if( newVal ) {
          const {menuId, menuList} = newVal
          let item = menuList.filter( item=>item.id === +menuId )
          console.log( item, '====menu item ' )
          this.treeList = item.length ? item[0].children : []
          if( this.$route.query.cate === 'tree' ) {
            this.updateTree( {
              activeTreeId: this.$route.query.levelId
            } )
          }
          // this.updateTree( {
          //   curIdPath: this.treeList[0].idList,
          // } )
        }
      },
      deep: true
    },
    activeTreeId: {
      handler( newVal ) {
        // console.log( this.$refs.tree, '====$refs.tree' )
        if( newVal ) {
          // this.$nextTick( ()=>{
          //   this.$refs.tree.setCurrentKey( newVal.toString() )
          //   console.log( this.$refs.tree.getNode( newVal.toString() ), '=====getNode' )
          // } )
          setTimeout( ()=>{
            this.$refs.tree.setCurrentKey( newVal.toString() )
            console.log( this.$refs.tree.getNode( newVal.toString() ), '=====getNode' )
          }, 0 )
          // this.highlightKey = newVal.activeTreeId.toString()
        }
      },
      immediate: true
    },
    treeList: function( newVal ) {
      if( newVal.length ) {
        const {cate, levelId} = this.$route.query
          if( cate === 'tree' ) {
            this.updateTree( {
              activeTreeId: levelId
            } )
            
          }
      }
    }
  },
  mounted(){
    // console.log( this.$route.query, '====query' )
    // 初始化提交，默认序列
  },
  methods: {
    ...mapMutations( [
      'updateTree',
      'updateArticle',
    ] ),
    handleNodeClick( obj ) {
      console.log( obj, '=====curTreeitem' )
      const {article_id, idList} = obj
      this.updateTree( {
        curIdPath: idList,
        curTreeItem: obj
      } )
      // 上传操作文章ID
      this.updateArticle( {
        articleId: article_id || '',
      } )
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
