<template>
  <div>
    <mavon-editor v-html="content" :subfield="false" :defaultOpen="'preview'" :toolbarsFlag="false" :boxShadow="false" v-if="content"/>
    <p v-else>{{articleId?'该文章暂无内容':'暂无文章'}}</p>
    <template v-if="articleId">
      <el-button v-if="!isCollect" icon="el-icon-star-off" circle @click="switchCollect"></el-button>
      <el-button v-else icon="el-icon-star-on" circle class="fe-icon-star-on" @click="switchCollect"></el-button>
    </template>
  </div>
</template>

<script>
import { articleCollect, articleCollectCancel } from '@/assets/js/api'
import { mapState, mapMutations } from 'vuex'

export default {
  props: {},
  data(){
    return {}
  },
  computed:{
    ...mapState( {
      isLogin: state => state.isLogin,
      article: state => state.article,
    } ),
    // 内容
    content() {
      return this.article.details.content
    },
    // 是否收藏
    isCollect() {
      return this.article.details.isCollect 
    },
    articleId() {
      return this.article.articleId
    }
  },
  watch: {
    articleId: {
      handler( newVal ) {
        console.log( newVal, '=====articleID' )
        // 监听变化，有则请求，无则置空
        if( newVal ) {
          this.$store.dispatch( 'getArticle' )
        } else {
          this.updateArticle( {
            details: {}
          } )
        }
      },
      immediate: true
    },
    
  },
  methods:{
    ...mapMutations( [
      'updateArticle'
    ] ),
    // 收藏&&取消收藏
    switchCollect() {
      if( !this.isLogin ) {
        this.$router.push( '/login' )
        return 
      }
      // this.isCollect ? this.cancelFn() : this.collectFn()
      let fn = this.isCollect ? articleCollectCancel : articleCollect 
      fn( {
        id: this.articleId,
      } ).then( ( result )=>{
        this.handleRes( result )
      } )
    },
    // 结果处理都差不多，放一起吧
    handleRes( {success, msg} ) {
      if( success ) {
          let details = JSON.parse( JSON.stringify( this.article.details ) )
          details.isCollect = !this.isCollect
          this.updateArticle( {details} )
          // 清除缓存，重新获取新数据
          sessionStorage.removeItem( 'article_' + this.articleId )
        } else {
          this.$message.error( msg || '连接失败' );
        }
    },
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
