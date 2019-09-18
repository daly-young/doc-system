<template>
  <el-header>
    <el-row class="layout">
      <el-col :span="4" @click="backHome"><div class="grid-content fe-title">DALY-DOC</div></el-col>
      <el-col :span="20" class="fe-headerRight">
        <!-- 一级目录 -->
        <el-menu 
          :default-active="menu.menuId.toString()" 
          class="el-menu-demo" 
          mode="horizontal" 
          text-color="#79BBFF"
          active-text-color="#409EFF">
          <template
            v-for="(item) in menu.menuList" >
            <el-menu-item 
              :key="item.id" 
              :index="item.id.toString()"
              @click="changeList(item)">{{item.label}}</el-menu-item>
          </template>
          <!-- 搜索 -->
          <el-menu-item :index="searchIndex">
            <input type="search" class="fe-search" v-model="keywords" placeholder="关键字，例如：授信">
            <i class="el-icon-search" @click="searchFn"></i>
          </el-menu-item>
          <!-- 用户 -->
          <template v-if="isLogin">
            <el-menu-item class="fe-username" :index="userIndex">
              <a href="/user">
                <i class="el-icon-user-solid"></i>
                <span>{{menu.userName}}</span>
              </a>
            </el-menu-item>
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
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'feHeader',
  data() {
    return {
      keywords: '',
    }
  },
  computed: {
    ...mapState( {
      // category: state => state.category,
      // activeIndex: state => state.activeIndex,
      // switchEditor: state => state.switchEditor,
      article: state => state.article,
      menu: state => state.menu,
      isLogin: state =>state.isLogin
    } ),
    searchIndex() {
      return ( this.menu.menuList.slice( -1 ).id + 1 ).toString()
    },
    userIndex() {
      return ( this.menu.menuList.slice( -1 ).id  + 2 ).toString()
    }
  },
  watch:{
    'menu.menuList':{
      handler: function( newVal ){
        if( newVal.length ) {
          const {cate, levelId} = this.$route.query
          if( cate === 'menu' ) {
            this.$nextTick( ()=>{
              this.updateMenu( {
                menuId: levelId
              } )
            } )
          }
        }
      }
    }
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations( [
      'updateMenu',
      'updateArticle',
      'updateTree'
    ] ),
    ...mapActions( [
      // 'getCateListFn',
      // 'getUser'
    ] ),
    init() {
      // 获取用户信息
      this.$store.dispatch( 'getUser' )

      // 获取所有分类信息
      let param = {}
      if( this.$route.query.cate === 'menu' ) {
          param = {id: this.$route.query.levelId || ''}
      }
      this.$store.dispatch( 'getCateListFn', param )
    },
    backHome() {
      this.$router.push( '/' )
    },
    // 切换选项
    changeList( item ) {
      this.updateMenu( {
        menuId: item.id,
        curMenuItem: item
      } )
      this.updateTree( {
        curTreeItem: {},
      } )
    },
    // 搜索功能
    searchFn() {
      const {keywords} = this
      if( !this.keywords ) {
        this.$message( {
          message: '请先输入关键字',
          type: 'warning'
        } );
        return
      }
      this.$router.push( {
        path: '/search',
        query: {
          keywords
        }
      } )
    },
    // 创建新文章
    createFn() {
      // 编辑状态不可创建
      if( this.article.isEdit ) {
        this.$message( {
          message: '请先保存编辑模板',
          type: 'warning'
        } );
        return
      }
      // 插入新数据，切换书写模板，清空数据
      this.updateArticle( {
        createShow: true
      } )
    },
    // 登录
    login() {
      this.$router.push( {
        path: '/login',
        query: {
          backUrl: encodeURI( window.location.href )
        }
      } )
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
