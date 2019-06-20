<template>
  <div class="fe-create">
    <i class="el-icon-circle-close" @click="closeFn"></i>
    <template>

    </template>
    <template></template>
    <div class="fe-create-content">
      <div class="fe-create-input">
        <span>一级目录：</span>
        <el-cascader
          placeholder="试试搜索：指南"
          :options="list"
          filterable
          change-on-select
          @change="chooseVal"
          ref="cascaderLabels"
          :popper-class="'fe-cascader'"
          v-if="!toCreate"></el-cascader>
          <el-input
          placeholder="请填写一级目录名称"
          v-model="firstCate"
          v-else></el-input>
        <el-link type="primary" size="middle" @click="siwtchFn">{{toCreate?'选择现有目录':'想要创建新目录'}}<i class="el-icon-plus" v-if="!toCreate"></i></el-link>
      </div>
      <div class="fe-create-input">
        <span>文章名称：</span>
        <el-input
          placeholder="请填写文章标题"
          v-model="articleTitle">
        </el-input>
        <el-button type="primary" size="middle" @click="createFn">创建</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { articleCreate } from '@/assets/js/api'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      selectId: -1,
      articleTitle:'',
      currentLabels: [],
      toCreate: false,
      firstCate: '',
      selectObj: {}
    }
  },
  computed:{
    ...mapState({
      list: state => state.firstList
    })
  },
  mounted(){
    console.log(this.list)
  },
  methods:{
    ...mapMutations([
      'updateData',
    ]),
    ...mapActions([
      'getFirstListFn',
      'getSecondListFn'
    ]),
    chooseVal(val) {
      this.selectObj = this.list.find((item)=>item.value == val[0])
    },
    createFn() {
      if(!this.articleTitle) return
      let {id,index} = this.selectObj
      articleCreate({
        first_cate: this.firstCate,
        title: this.articleTitle,
        parent_id: this.toCreate ? -1 : id,
      }).then(({success, result, msg})=>{
        if(success) {
          this.updateData({
              createShow: false,
              switchEditor: true,
              fromCreate: true,
              curItem: {},
              curId: result.id,
            })
          if(this.toCreate) {
            // 刷新一级目录,会自动刷新二级目录
            this.$store.dispatch('getFirstListFn')
            // 切换面板
          }else {
            // 切换面板
            // 组装curItem
            // 存储curId
            // 关闭创建面板
            this.updateData({
              firstId:  id,
              activeIndex_first: index.toString(),
            })
            this.$store.dispatch('getSecondListFn')
          }
        } else {
            this.$message.error(msg || '创建失败');
        }
      })
    },
    closeFn() {
      this.updateData({
        createShow: false,
      })
    },
    siwtchFn() {
      this.toCreate = !this.toCreate
      this.selectObj = {}
    }
  }
}
</script>
<style lang="scss" scoped>
.fe-create {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:rgba(0,0,0,.4);
  z-index: 99999;
  .el-icon-circle-close {
    position: fixed;
    top: 20%;
    right: 18%;
    font-size: 40px;
    color: #fff;

  }
  &-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    width: 60%;
    min-height: 400px;
    border-radius: 4px;
    padding: 20px;
  }
  &-input {
    margin-bottom: 20px;
    span:first-child {
      display: inline-block;
      width: 160px;
    }
    .el-input {
      width: 50%!important;
      margin-right: 20px;
    }
    .el-cascader {
      width: 50%;
      margin-right: 20px;
    }
  }
}
</style>



