<template>
  <el-aside width="200px">
    <el-tree 
      v-if="treeList&&treeList.length"
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
export default {
  data() {
    return {}
  },
  computed:{
    ...mapState( {
      tree: state => state.tree,
      menu: state => state.menu,
    } ),
    activeTreeId() {
      return this.tree.activeTreeId
    },
    // flatMenuList() {
    //   return this.menu.flatMenuList
    // },
    // 树形图数据根据切换的menuID而变化
    treeList() {
      return this.menu && this.tree.treeList[this.menu.menuId]
    }
  },
  watch:{
    // menu: {
    //   handler( newVal ) {
    //     if( newVal ) {
    //       const {menuId, menuList} = newVal
    //       let item = menuList.filter( item=>item.id === +menuId )
    //       this.treeList = item.length ? item[0].children : []

    //       // 获取数据之后取出需要先展示的文章信息
    //       const levelId = sessionStorage.getItem( 'dalydoc_search' )
    //       if( levelId != null && levelId != '' ) {
    //         let item  = this.flatMenuList.filter( item=>item.id == levelId )
    //         if( !item.length )return
    //         item = item[0]
    //         // console.log( item, '=====levelID 找到的对象' )
    //         // 一级目录直接提交
    //         if( item.parent_id == 0 ){
    //           this.updateMenu( {
    //             menuId: item.id,
    //             curMenuItem: item
    //           } )
    //         }else {
    //           // tree目录需要提交一级目录以及当前treeId
    //           this.updateMenu( {
    //             menuId: item.idList[0],
    //           } )
    //           this.updateTree( {
    //             activeTreeId: levelId,
    //           } )
    //         }
    //         sessionStorage.removeItem( 'dalydoc_search' )
    //       }
    //     }
    //   },
    //   deep: true
    // },
    treeList: {
      handler( newVal ) {
        if( newVal ) {
          this.$nextTick( ()=>{
          const searchObj = JSON.parse( sessionStorage.getItem( 'dalydoc_search' ) )
          if( searchObj ) {
            this.updateTree( {
              activeTreeId: searchObj.levelId
            } )
            sessionStorage.removeItem( 'dalydoc_search' )
          }
        } )
        }
      }
    },
    activeTreeId: {
      // 监听动态activeTreeId
      // 当创建的时候，实现高亮 TODO:
      // 从搜索页面跳回来的时候实现高亮，并请求文章信息
      handler( newVal ) {
        console.log( newVal, '==== activeTreeId  newVal' )
        if( newVal ) {
          setTimeout( ()=>{
            // 设置高亮
            this.$refs.tree.setCurrentKey( newVal.toString() )
            // 获取当前高亮对象
            const curItem = this.$refs.tree.getNode( newVal.toString() )
            const { article_id } = curItem.data
            // 提交对象
            this.updateTree( {
              curTreeItem: curItem.data
            } )
            // 提交获取文章ID
            this.updateArticle( {
              articleId: article_id
            } )
          }, 0 )
        }
      },
      immediate: true
    },
  },
  mounted(){},
  methods: {
    ...mapMutations( [
      'updateTree',
      'updateArticle',
      'updateMenu',
    ] ),
    // 手动操作选中
    handleNodeClick( obj ) {
      // console.log( obj, '=====curTreeitem' )
      const { article_id } = obj
      // 上传当前选中对象
      this.updateTree( {
        curTreeItem: obj
      } )
      // 上传操作文章ID
      this.updateArticle( {
        articleId: article_id || '',
      } )
    }
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
