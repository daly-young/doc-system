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
import { setTimeout } from 'timers';

export default {
  name: 'treeMenus',
  props:{
    data: Array, // 树状结构
    curCateKey: [Number, String]
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState( {
      // curCateKey: state => state.curCateKey
    } )
  },
  watch:{
    curCateKey( newVal ) {
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
    this.updateData( {
      selectItemIdList: this.data[0].idList,
    } )

  },
  methods: {
    ...mapMutations( [
      'updateData',
    ] ),
    handleNodeClick( obj ) {
      // console.log( obj )
      const {article_id, idList, path, children_count} = obj
      this.updateData( {
        selectItemIdList: idList,
        breadNav: path,
        childrenCount: children_count
      } )
      // 上传操作文章ID，并请求文章
      if( article_id ) {
        this.updateData( {
          articleId: article_id,
        } )
        this.$store.dispatch( 'getArticle' )
      } else {
        this.updateData( {
          articleId: '',
          articleDetails: {},
        } )
      }
    },
  }
}
</script>




