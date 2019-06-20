<template>
  <el-header>
    <el-row class="layout">
      <el-col :span="4" @click="backHome"><div class="grid-content fe-title">FE-DOC</div></el-col>
      <el-col :span="20" class="fe-headerRight">
        <el-menu 
          :default-active="activeIndex" 
          class="el-menu-demo" 
          mode="horizontal" 
          @select="handleSelect" 
          text-color="#79BBFF"
          active-text-color="#409EFF">
          <template
            v-for="(item,index) in firstList" 
            :index="index">
            <el-menu-item 
              :key="item.id" 
              :index="index+''"
              @click="changeList(item)">{{item.title}}</el-menu-item>
          </template>
          <el-menu-item :index="firstList.length+1+''">
            <input type="search" class="fe-search" v-model="keywords" placeholder="search(还没开发)">
            <i class="el-icon-search" @click="searchFn"></i>
          </el-menu-item>
          <template v-if="isLogin">
            <el-menu-item class="fe-username" :index="firstList.length+2+''">
              <a href="/user">
                <i class="el-icon-user-solid"></i>
                <span>{{userName}}</span>
              </a>
            </el-menu-item>
            <!-- <el-menu-item index="8">
              <i class="el-icon-setting"></i>
            </el-menu-item> -->
            <el-button type="primary" @click="createFn">创建</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="login">登录</el-button>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { searchAll,userInfo} from '@/assets/js/api'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'feHeader',
  data() {
    return {
      projectList:[],
      // activeIndex: '0', // 必须是字符串
      keywords: '',
      userName:'',
      isLogin: false,
      len: 0
    }
  },
  computed: {
    ...mapState({
      firstList: state => state.firstList,
      firstId: state => state.firstId,
      activeIndex: state => state.activeIndex_first,
      switchEditor: state => state.switchEditor,
    })
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations([
      'updateData',
    ]),
    ...mapActions([
      'getFirstListFn',
      'getSecondListFn',
    ]),
    init() {
      this.getUser()
      this.$store.dispatch('getFirstListFn')
    },
    getUser() {
      userInfo().then(({success,result,code,msg})=>{
        if(success) {
            this.isLogin = true
            this.userName = result.user_name
        }else {
          if(code===1999) {
            this.isLogin = false
          }else {
            this.$message.error(msg || '错了哦，这是一条错误消息');
          }
        }
      })
    },
    backHome() {
      this.$router.push('/')
    },
    showProject() {},
    handleSelect(){},
    changeList({id, title}) {
      this.updateData({
        firstId: id,
        firstTitle: title
      })
      this.$store.dispatch('getSecondListFn')
    },
    searchFn() {
      searchAll({
        keywords:  this.keywords
      }).then(()=>{})
    },
    createFn() {
      // 编辑状态不可创建
      if(this.switchEditor) {
        this.$message({
          message: '请先保存编辑模板',
          type: 'warning'
        });
        return
      }
      // 插入新数据，切换书写模板，清空数据
      this.updateData({
        createShow: true
      })
    },
    login() {
      this.$router.push({
        path: '/login',
        query: {
          backUrl: encodeURI(window.location.href)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  z-index: 1999;
  overflow: hidden;
  height: 60px;
}
.el-row {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  height: 60px;
  overflow: hidden;
  // padding-left:20px ;
  .fe-title {
    font-size: 24px;
    font-weight: bold;
  }
}
.el-col {
  text-align: left;
  cursor: pointer;
}
.el-menu {
  background-color: transparent;
}
.fe-search {
  border: none;
  line-height: 30px;
  border-radius: 4px;
  outline: none;
  border: 1px solid rgba(0,0,0,.1);
  padding: 0 10px;
}
a {
  text-decoration: none;
}
.fe-username{
  margin-right: 20px !important;
}
.fe-headerRight ul{
  // justify-content: flex-end;
  text-align: right;
}
</style>
