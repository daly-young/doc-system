<template>
  <el-header height="210px" class="layout">
    <el-row>
      <el-col :span="4"><div class="grid-content fe-title" @click="backHome">DALY-DOC</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <!-- <span class="user__header"><img :src="headerImg" alt=""></span> -->
        <span class="user__header"><i class="el-icon-user"></i></span>
      </el-col>
      <el-col :span="10" class="user__info">
        <el-row :gutter="10">
          <h1>{{userName}}</h1>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10"><div class="grid-content bg-purple">权限：{{character}}</div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">邮箱：{{email || '还没设置邮箱？'}}</div></el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
import { userInfo } from '@/assets/js/api'
export default {
  name: 'user',
  data(){
    return {
      // headerImg: require('@/assets/header.jpeg'),
      userName: '',
      character: 'user',
      email: '',
    }
  },
  created() {
    this.init()
  },
  methods:{
    init() {
      userInfo().then(({success,result,msg})=>{
        if(success) {
          this.userName = result.user_name
          this.character = result.character
          this.email = result.email
        }else {
          this.$message.error(msg || '错了哦，这是一条错误消息');
        }
      })
    },
    backHome() {
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // padding-top: 20px;
  padding: 0;
  background-color: #fff;
  color: #409EFF;
  text-align: center;
  line-height: 60px;
  z-index: 1000;
  border-bottom: 1px solid #eee;
  & > .el-row:first-child {
    border-bottom: 1px solid #eee;
    line-height: 60px;
    text-align: left;
    padding-left: 20px;
    font-weight: bold;
    font-size:24px;
    cursor: pointer;
  }
  & > .el-row:last-child {
    // padding-left: 200px;
    padding-top: 20px;
  }
}

.user {
  padding-top: 160px;
  &__header {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    overflow: hidden;
    img {
      width: 100%;
    }
    .el-icon-user {
      font-size: 80px;
      line-height: 100px;
    }
  }
  h1 {
    line-height: 50px;
  }
  &__info {
    text-align: left;
    padding-left: 20px;
  }
}
</style>