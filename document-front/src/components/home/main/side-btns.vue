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
    // 如果activeTreeId为空，说明当前操作的是menu对象一级目录
    isMenuNow() {
      return this.tree.activeTreeId === ''
    },
    showDelete() {
      // console.log( this.article.details.hasRight, this.tree.curTreeItem.children_count )
      // 如果是一级目录，直接返回false，之后后台管理员才可以删除
      if( this.isMenuNow ) return
      // 只有是本人创建，并且没有子集的才可以删除
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
          window.location.reload()
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

