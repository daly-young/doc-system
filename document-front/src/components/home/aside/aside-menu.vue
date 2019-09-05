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
import { mapMutations } from 'vuex'

export default {
  name: 'treeMenus',
  props:{
    data: Array, // 树状结构
  },
  data() {
    return {
    }
  },
  mounted(){
    // 初始化提交，默认序列
    this.updateData( {
      selectItemIdList: this.data[0].idList,
    } )
    // this.$refs.tree.setCurrentKey( 15 )

  },
  methods: {
    ...mapMutations( [
      'updateData',
    ] ),
    handleNodeClick( obj ) {
      console.log( obj )
      const {article_id, idList, path} = obj
      // 上传操作文章ID，并请求文章
      if( article_id ) {
        this.updateData( {
          articleId: article_id,
          selectItemIdList: idList,
          breadNav: path
        } )
        this.$store.dispatch( 'getArticle' )
      }
    },
  }
}
</script>




