<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" plain circle class="fe-button-edit" @click="switchFn"></el-button>
    <fe-history></fe-history>
    <el-button type="danger" icon="el-icon-delete" plain circle class="fe-button-delete" @click="showDialog" v-if="showDelete"></el-button>
  </div>
</template>
<script>
import feHistory from './history.vue'
import { articleDelete } from '@/assets/js/api'
import { mapMutations, mapState } from 'vuex'
export default {
  components:{
    feHistory
  },
  computed:{
    ...mapState( {
      article: state => state.article,
      isLogin: state => state.isLogin,
      tree: state => state.tree,
      menu: state => state.menu
    } ),
    articleId() {
      return this.article.articleId
    },
    showDelete() {
      // 只有是本人创建，并且没有子集的才可以删除
      console.log( this.article.details.hasRight, this.tree.curTreeItem.children_count )
      return this.article.details.hasRight && !this.tree.curTreeItem.children_count
    }
  },
  methods:{
    ...mapMutations( [
      // 'updateData',
      'updateTree',
      'updateArticle',
    ] ),
    showDialog() {
      this.$confirm( '确定要删除该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        } ).then( () => {
          this.deleteFn()
        } )
    },
    deleteFn() {
      if( !this.isLogin ) {
        this.$router.push( '/login' )
        return 
      }

      articleDelete( {
        id: this.articleId,
      } ).then( ( { success, msg } )=>{
        if( success ) {
          this.$message( '删除成功' );
          // todo:然后展示切换到上一篇
          this.updateTree( {
            activeTreeId: '', // 选中treeItemID， String
            curTreeItem: {},
            curIdPath: [],
          } )
          this.updateArticle( {
            articleId: this.menu.curMenuItem.article_id
          } )
          // window.location.reload()
        } else {
          this.$message.error( msg || '删除失败' );
        }
      } )
    },
    switchFn() {
      if( !this.isLogin ) {
        this.$router.push( '/login' )
      } else {
        this.updateArticle( {
          isEdit: true
        } )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
button[class*="fe-"] {
  position: fixed;
  // bottom: 80px;
  right: 20px;
  z-index: 1999;
}
.fe-button-edit {
  bottom: 80px;
}
.fe-history {
  position: fixed;
  right: 20px;
  z-index: 1999;
  bottom: 140px;
}
.fe-button-delete {
  bottom: 20px;
}
</style>

