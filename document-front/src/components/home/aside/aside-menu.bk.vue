<template >
  <el-tree 
    :data="data" 
    node-key="id"
    @node-click="handleNodeClick"
    highlight-current
    default-expand-all
    :expand-on-click-node="false"
    ref="tree"
  ></el-tree>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'treeMenus',
  props:{
    data: Array, // 树状结构
    curTreeKey: [Number, String]
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState( {} )
  },
  watch:{
    curTreeKey( newVal ) {
      // console.log( newVal, '======', oldVal, '======Val' )
      if( newVal != '' ) {
        setTimeout( ()=>{
          this.$refs.tree.setCurrentKey( newVal )
        }, 0 )
      }
    }
  },
  mounted(){
    // 初始化提交，默认序列
    this.updateTree( {
      curIdPath: this.data[0].idList,
    } )

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
      // 上传操作文章ID，并请求文章
      // if( article_id ) {
      //   this.updateArticle( {
      //     articleId: article_id,
      //   } )
      //   // this.$store.dispatch( 'getArticle' )
      // } else {
      //   this.updateArticle( {
      //     articleId: '',
      //     details: {},
      //   } )
      // }
      this.updateArticle( {
        articleId: article_id || '',
      } )
    },
  }
}
</script>




