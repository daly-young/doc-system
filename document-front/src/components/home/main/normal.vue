<template>
  <div>
    <mavon-editor v-html="content" :subfield="false" :defaultOpen="'preview'" :toolbarsFlag="false" :boxShadow="false" v-if="articleDetails.content"/>
    <p v-else>该文章暂无内容</p>
    <el-button v-if="!isCollect" icon="el-icon-star-off" circle @click="switchCollect"></el-button>
    <el-button v-else icon="el-icon-star-on" circle class="fe-icon-star-on" @click="switchCollect"></el-button>
  </div>
</template>

<script>

import { articleCollect, articleCollectCancel } from '@/assets/js/api'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'feMain',
  props: {
  },
  data(){
    return {
      value: '',
      off: true,
    }
  },
  computed:{
    ...mapState( {
      articleId: state => state.articleId,
      articleDetails: state => state.articleDetails,
      isLogin: state => state.isLogin,
    } ),
    content() {
      return this.articleDetails && this.articleDetails.content
    },
    isCollect() {
      return this.articleDetails && this.articleDetails.isCollect
    }
  },
  created() {},
  methods:{
    ...mapMutations( [
      'updateData',
      'updateArticle'
    ] ),
    // 收藏&&取消收藏
    switchCollect() {
      if( !this.isLogin ) {
        this.$router.push( '/login' )
        return 
      }
      this.articleDetails.isCollect ? this.cancelFn() : this.collectFn()
    },
    // 收藏
    collectFn() {
      articleCollect( {
        id: this.articleId,
      } ).then( ( {success, msg} )=>{
        if( success ) {
          this.updateArticle( {
            isCollect: true
          } )
          this.removeStorage()
        } else {
          this.$message.error( msg || '连接失败' );
        }
      } )
    },
    // 取消收藏
    cancelFn() {
      articleCollectCancel( {
        id: this.articleId,
      } ).then( ( {success, msg} )=>{
        if( success ) {
          this.updateArticle( {
            isCollect: false
          } )
          this.removeStorage()
        } else {
          this.$message.error( msg || '连接失败' );
        }
      } )
    },
    // 清除缓存，重新获取新数据
    removeStorage() {
      sessionStorage.removeItem( 'article_' + this.articleId )
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  height: 100%;
  position: relative;
  padding-right: 50px;
}
.markdown-body {
  padding: 20px;
  padding-left: 0;
}
.fe-icon-star-on{
  color: orange!important;
}
.el-button {
  position: fixed;
  right: 20px;
  top: 80px;
  z-index: 999;
}

</style>
