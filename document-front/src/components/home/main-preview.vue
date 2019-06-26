<template>
  <el-main>
    <div class="breadcrumbBox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{firstTitle}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{secondTitle}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <mavon-editor v-html="curItem.content" :subfield="false" :defaultOpen="'preview'" :toolbarsFlag="false" :boxShadow="false" v-if="curItem.content"/>
    <p v-else>暂无内容</p>
    <el-button v-if="!curItem.isCollect" icon="el-icon-star-off" circle @click="switchCollect"></el-button>
    <el-button v-if="curItem.isCollect" icon="el-icon-star-on" circle class="fe-icon-star-on" @click="switchCollect"></el-button>
  </el-main>
</template>

<script>

import { articleCollect, articleCollectCancel } from '@/assets/js/api'
import { mapState,mapMutations,mapActions } from 'vuex'

export default {
  name: 'feMain',
  props: {
  },
  data(){
    return {
      value: '',
      off: true,
      // hasContent: true,
      // isCollect: false
    }
  },
  created() {
    this.init()
  },
  computed:{
    ...mapState({
      curId: state => state.curId,
      // content: state => state.content,
      // isCollect: state => state.isCollect,
      secondTitle: state => state.secondTitle,
      firstTitle: state => state.firstTitle,
      curItem: state => state.curItem,
      isLogin: state => state.isLogin,
    })
  },
  watch:{
  },
  methods:{
    ...mapMutations([
      'updateData',
    ]),
    ...mapActions([
      'getArticle'
    ]),
    init() {
      // 获取文章
      this.$store.dispatch('getArticle',{ id: this.curId })
    },
    switchCollect() {
      if(!this.isLogin) {
        this.$router.push('/login')
        return 
      }
      !this.curItem.isCollect&&this.collectFn()
      this.curItem.isCollect&&this.cancelFn()
    },
    collectFn() {
      articleCollect({
        id: this.curId,
        name: this.secondTitle,
      }).then(({success, msg})=>{
        if(success) {
          let data = JSON.parse(JSON.stringify(this.curItem))
          data.isCollect = true
          this.updateData({
            curItem: data
          })
          // this.curItem.isCollect = true
        } else {
          this.$message.error(msg || '连接失败');
        }
      })
    },
    cancelFn() {
      articleCollectCancel({
        id: this.curId,
        name: this.secondTitle,
      }).then(({success, msg})=>{
        if(success) {
          let data = JSON.parse(JSON.stringify(this.curItem))
          data.isCollect = false
          this.updateData({
            curItem: data
          })
        } else {
          this.$message.error(msg || '连接失败');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  // padding-top: 60px;
  height: 100%;
  position: relative;
  padding-right: 50px;
}
.markdown-body {
  // height: 100%;
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

.breadcrumbBox {
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  background-color:rgba(255,255,255,.95);
  // z-index: 9999;
  overflow: hidden;
  padding: 20px 0;
}
.el-breadcrumb {
  float: left;
  line-height: 30px;
  border: 1px solid #eee;
  padding: 0 20px;
  border-radius: 5px;
}
</style>
