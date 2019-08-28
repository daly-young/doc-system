<template>
  <el-header>
    <el-row class="layout">
      <el-col :span="4" @click="backHome"><div class="grid-content fe-title">DALY-DOC</div></el-col>
      <el-col :span="20" class="fe-headerRight">
        <!-- 一级目录 -->
        <el-menu 
          :default-active="activeIndex" 
          class="el-menu-demo" 
          mode="horizontal" 
          text-color="#79BBFF"
          active-text-color="#409EFF">
          <template
            v-for="(item,index) in category" 
            :index="index.toString()">
            <el-menu-item 
              :key="item.id" 
              :index="index.toString()"
              @click="changeList(item)">{{item.label}}</el-menu-item>
          </template>
          <!-- 搜索 -->
          <el-menu-item :index="searchIndex">
            <input type="search" class="fe-search" v-model="keywords" placeholder="search(还没开发)">
            <i class="el-icon-search" @click="searchFn"></i>
          </el-menu-item>
          <!-- 用户 -->
          <template v-if="isLogin">
            <el-menu-item class="fe-username" :index="userIndex">
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
import { searchAll, userInfo} from '@/assets/js/api'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'feHeader',
  data() {
    return {
      projectList:[],
      keywords: '',
      userName:'',
      isLogin: false,
      len: 0
    }
  },
  computed: {
    ...mapState({
      category: state => state.category,
      activeIndex: state => state.activeIndex,
      switchEditor: state => state.switchEditor,
    }),
    searchIndex() {
      return (this.category.length+1).toString()
    },
    userIndex() {
      return (this.category.length+2).toString()
    }
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations([
      'updateData',
      'updateSideCategory'
    ]),
    ...mapActions([
      'getCateListFn',
    ]),
    init() {
      // 获取用户信息
      this.getUser()
      // 获取所有分类信息
      this.$store.dispatch('getCateListFn')
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
        // 提交登录状态
        this.updateData({
          isLogin: this.isLogin
        })
      })
    },
    backHome() {
      this.$router.push('/')
    },
    // 切换选项
    changeList({id}) {
      this.updateSideCategory({
        firstLevelId: id,
      })
    },
    // 搜索功能
    searchFn() {
      searchAll({
        keywords:  this.keywords
      }).then(()=>{})
    },
    // 创建新文章
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
    // 登录
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
