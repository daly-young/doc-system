<template>
<!-- // todo: 上传图片 -->
  <div>
    <mavon-editor v-model="value" @change="changeData"/>
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
      articleId: state => state.articleId,
      articleDetails: state => state.articleDetails,
      selectItemIdList: state => state.selectItemIdList,
      breadNav: state => state.breadNav
    } )
  },
  created() {
    this.value = this.articleDetails.md || ''
  },
  methods:{
    ...mapMutations( [
      'updateData',
    ] ),
    saveData() {
      // todo:通知修改展示状态
      // 有ID更新，没有创建
      console.log( this.articleId, '=====artID' )
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
        parentId: this.selectItemIdList[this.selectItemIdList.length - 1],
        articleTitle: this.breadNav[this.breadNav.length - 1],
        content: this.render,
        md: this.value
      } ).then( ( {success, result, msg} )=>{
        if( success ) {
          // 关闭创建面板=》修改默认id序列=》提交生成文章的ID=》调出编辑面板
          this.updateData( {
            articleId: result.articleId,
            switchEditor: false,
            curCateKey: result.cateId
          } )
          this.$store.dispatch( 'refreshCate' )
          this.$store.dispatch( 'getArticle' )
        } else {
            this.$message.error( msg || '创建失败' );
        }
      } )
    },
    changeData( value, render ) {
        this.render = render
    },
    cancelFn() {
      this.updateData( {
        switchEditor: false
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
