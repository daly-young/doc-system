<template>
  <div class="fe-create">
    <i class="el-icon-circle-close" @click="closeFn"></i>
    <div class="fe-create-content">
      <div class="fe-create-input">
        <span>选择层级：</span>
        <el-cascader
          placeholder="试试搜索：指南"
          :options="list"
          filterable
          change-on-select
          @change="chooseVal"
          ref="cascaderLabels"
        ></el-cascader>
      </div>
      <!-- <div class="fe-create-input">
        <span>创建下一级目录：</span>
        <el-input
          placeholder="请输入内容"
          v-model="input4">
        </el-input>
        <el-button type="primary" size="middle">创建</el-button>
      </div>
      <h4>
        <span v-for="(item, index) in currentLabels" :key="index">{{item}} ></span>
      </h4> -->
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
      currentLabels: []
    }
  },
  computed:{
    ...mapState({
      list: state => state.firstList
    })
  },
  mounted(){
  },
  methods:{
    ...mapMutations([
      'updateData',
    ]),
    ...mapActions([
      'getSecondListFn'
    ]),
    chooseVal(val) {
      this.selectId = val[0]
    },
    createFn() {
      if(!this.articleTitle) return
      articleCreate({
        title: this.articleTitle,
        parent_id:this.selectId
      }).then(({success, result, msg})=>{
        if(success) {
          // 切换面板
          // 组装curItem
          // 存储curId
          // 关闭创建面板
          this.updateData({
            firstId: this.selectId,
            activeIndex_first: this.selectId.toString(),
            createShow: false,
            switchEditor: true,
            curId: result.id,
            fromCreate: true,
            curItem: {}
          })
          this.$store.dispatch('getSecondListFn')
        } else {
            this.$message.error(msg || '创建失败');
        }
      })
    },
    closeFn() {
      this.updateData({
        createShow: false,
      })
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
      width: 60%!important;
    }
    .el-cascader {
      width: 60%;
    }
  }
}
</style>



