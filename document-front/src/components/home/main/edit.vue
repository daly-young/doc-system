<template>
<!-- // todo: 上传图片 -->
  <div>
    <mavon-editor 
      ref="editor"
      v-model="value" 
      @change="changeData"
      @imgAdd="imgAdd"/>
    <el-button type="primary" @click="saveData">保存</el-button>
    <el-popover
      placement="top"
      width="160"
      v-model="cancelBoxShow">
      <p>确定不保存编辑内容吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="cancelBoxShow = false">取消</el-button>
        <el-button size="mini" type="primary" @click="cancelFn">确定</el-button>
      </div>
      <el-button slot="reference" type="info" plain>取消</el-button>
    </el-popover>
  </div>
</template>

<script>
import { articleUpdate, articleCreateOnly } from '@/assets/js/api'
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
// import qs from 'qs';

export default {
  name: 'feMain',
  props: {
  },
  data(){
    return {
      render:'',
      cancelBoxShow: false,
      value: ''
    }
  },
  computed:{
    ...mapState( {
      article: state => state.article,
      tree: state => state.tree
    } ),
    articleId() {
      return this.article.articleId
    },
    curTreeItem() {
      return this.tree.curTreeItem
    }
  },
  created() {
    this.value = this.article.details.md || ''
  },
  methods:{
    ...mapMutations( [
      'updateArticle',
      'updateTree',
    ] ),
    saveData() {
      // todo:通知修改展示状态
      // 有ID更新，没有创建
      // console.log( this.articleId, '=====artID' )
      if( this.articleId ) {
        this.updateFn()
      } else {
        this.createFn()
      }
      
    },
    updateFn() {
      articleUpdate( {
        id: this.articleId,
        content: this.render,
        md: this.value
      } ).then( ( { success, msg } )=>{
        if( success ) {
          // 清除缓存，重新获取，切换展示面板
          sessionStorage.removeItem( 'article_' + this.articleId )
          this.$store.dispatch( 'getArticle' )
          this.cancelFn()
        } else {
          this.$message.error( msg || '更新失败' );
        }
      } )
    },
    createFn() {
      articleCreateOnly( {
        parentId: this.curTreeItem.id,
        articleTitle: this.curTreeItem.label,
        content: this.render,
        md: this.value
      } ).then( ( {success, result, msg} )=>{
        if( success ) {
          // 关闭创建面板=》修改默认id序列=》提交生成文章的ID=》调出编辑面板
          console.log( result.articleId, '====新增articleId' )
          this.updateArticle( {
            isEdit: false,
            articleId: result.articleId,
          } )
          this.updateTree( {
            activeTreeId: result.cateId
          } )
          this.$store.dispatch( 'refreshCate' )
        } else {
            this.$message.error( msg || '创建失败' );
        }
      } )
    },
    changeData( value, render ) {
        this.render = render
    },
    cancelFn() {
      this.updateArticle( {
        isEdit: false
      } )
    },
    imgAdd( pos, $file ) {
      var formdata = new FormData();
      formdata.append( 'image', $file );
      axios.post( '/base/uploadImg', formdata, { headers: { 'Content-Type': 'multipart/form-data'}} ).then( ( {data} ) => {
        const {success, result} = data
        if( success ) {
          this.$refs.editor.$img2Url( pos, result.url[0] );
          console.log( this.$refs.editor )
        } else {
          this.$message.error( '图片上传失败~' );
        }
      } )
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown-body {
  height: 80%;
}
</style>
