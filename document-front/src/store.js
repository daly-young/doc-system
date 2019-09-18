import Vue from 'vue'
import Vuex from 'vuex'
import { getContent, getCateList, userCreateHistory, userCollectHistory, userOperationHistory, userInfo } from '@/assets/js/api'

Vue.use( Vuex )

export default new Vuex.Store( {
  state: {
    isLogin: false, // 是否登录
    switchEditor: false, // 是否切换面板
    createShow: false, // 是否展示创建面板
    firstLevelId: -1, // 一级目录ID
    category: [], // 所有分类数据
    sideCategory: {}, // 当前侧边栏数据
    sideCategoryActiveIndex: '', // 侧边栏初始化序列号
    // breadNav: [], // 面包屑数组
    activeIndex: '0', // 顶部导航初始话激活序列号
    articleId: -1, // 当前操作文章ID
    articleDetails: {},
    curTreeKey: 0, // 左边菜单高亮选项
    childrenCount: 0, // 当前选中菜单子集数量
    selectItemIdList: [], // 选中条目的id，创建模板默认路径使用
    fromCreate: false, // 是否为创建面板
    menu: {
      menuId: '', // 根目录ID，String
      menuList: [],
      userName: '',
      curMenuItem: {}
    },
    tree: {
      activeTreeId: '', // 选中treeItemID， String
      curTreeItem: {},
      curIdPath: [],
    },
    article: {
      articleId: '', // 当前展示文章ID
      details: {}, // 文章内容
      isEdit: false, // 编辑状态
      createShow: false // 创建面板
    },
    user: {
      activeIndex: '0',
      pagenationIndex: 0,
      tableList: [],
      tableHeader: [{
        label: '文章',
        value: 'article',
        width: 500
      }, {
        label: '日期',
        value: 'date',
        width: 300
      }],
      currentPage: 0,
      paginationTotal: 0,
    }
  },
  mutations: {
    updateData( state, obj ) {
      for ( let key in obj ) {
        state[key] = obj[key]
      }
    },
    // 更新当前文章信息
    // updateArticle( state, obj ) {
    //   for ( let key in obj ) {
    //     state.articleDetails[key] = obj[key]
    //   }
    // },
    updateArticle( state, obj ) {
      for ( let key in obj ) {
        state.article[key] = obj[key]
      }
    },
    updateMenu( state, obj ) {
      for ( let key in obj ) {
        state.menu[key] = obj[key]
      }
    },
    updateTree( state, obj ) {
      for ( let key in obj ) {
        state.tree[key] = obj[key]
      }
    },
    updateUser( state, obj ) {
      for ( let key in obj ) {
        state.user[key] = obj[key]
      }
    },
    // updateUserAside( state ) {
    //   let index = state.user.activeIndex
    //   let i = [1, 2]
    //   state.user.tableHeader = [{
    //     label: '文章',
    //     value: 'article',
    //     width: 500
    //   }, {
    //     label: '日期',
    //     value: 'date',
    //     width: 300
    //   }]
    //   if ( i.includes( index ) ) {
    //     state.user.tableHeader = state.user.tableHeader.splice( 1, 0, {
    //       label: '操作',
    //       value: 'operation',
    //       width: 200
    //     } )
    //   }
    // },
    // updateSideCategory( state, { firstLevelId, breadNav } ) {
    //   // 清空侧边栏数据
    //   state.sideCategory = undefined
    //   // 清空面包屑数据
    //   // state.breadNav = []
    //   // 重置侧边栏激活序列号
    //   state.sideCategoryActiveIndex = ''
    //   state.selectIndex = ''
    //   state.articleDetails = {}

    //   // 查找赋值
    //   state.firstLevelId = firstLevelId
    //   const list = state.category.find( ( { id } ) => id === firstLevelId )
    //   state.sideCategory = list ? list : undefined
    //   console.log( state.sideCategory, '===side' )

    //   // 更新面包屑
    //   state.breadNav = breadNav || []
    // },
    // updateSideActive( state, { sideCategoryActiveIndex } ) {
    //   if ( state.sideCategoryActiveIndex != '' ) return
    //   state.sideCategoryActiveIndex = sideCategoryActiveIndex
    // },
  },
  actions: {
    getArticle( { commit, state } ) {
      const { articleId } = state.article
      if ( !articleId ) {
        commit( 'updateArticle', {
          details: {},
        } )
        return
      }
      // 如果有缓存，优先使用缓存
      let data = sessionStorage.getItem( 'article_' + articleId )
      // console.log('artcile=====', data)
      if ( data ) {
        commit( 'updateArticle', {
          // curItem: JSON.parse(data),
          details: JSON.parse( data ),
          // switchEditor: state.fromCreate,
        } )
        return
      }

      // 请求文章信息
      getContent( { id: articleId } ).then( ( { success, result, msg } ) => {
        if ( success ) {
          // let data = {
          // curItem: result,
          // articleDetails: result,
          // switchEditor: state.fromCreate,
          // }
          // commit( 'updateData', data )
          commit( 'updateArticle', {
            details: result,
          } )
          // 存储数据，节省请求
          sessionStorage.setItem( 'article_' + articleId, JSON.stringify( result ) )
        } else {
          commit( 'updateArticle', {
            details: {},
          } )
          console.log( '[error]获取文章接口：' + msg );
        }

      } )
    },
    getCateListFn( { commit, dispatch } ) {
      // 初始化一级列表数据
      getCateList().then( ( { success, result, msg } ) => {
        if ( success ) {
          // 存储列表
          commit( 'updateMenu', {
            menuList: result,
            curMenuItem: result[0],
            menuId: result[0].id
          } )
          commit( 'updateArticle', {
            articleId: result[0].article_id,
            // breadNav: [result[0].label]
          } )
          dispatch( 'getArticle' )
        } else {
          console.error( msg )
        }
      } )
    },
    refreshCate( { commit }, params ) {
      // 初始化一级列表数据
      getCateList().then( ( { success, result, msg } ) => {
        if ( success ) {
          // 存储列表
          commit( 'updateMenu', {
            menuList: result,
          } )
          // 更新高亮ID
          const { activeTreeId } = params
          commit( 'updateTree', { activeTreeId } )
        } else {
          console.error( msg )
        }
      } )
    },
    getUserHistory( { commit, state }, params ) {
      let index = state.user.activeIndex
      let ajaxFunction = userCreateHistory
      index === 1 && ( ajaxFunction = userCollectHistory )
      index === 2 && ( ajaxFunction = userOperationHistory )
      ajaxFunction( params ).then( ( { success, result, msg } ) => {
        if ( success ) {
          if ( result.list && result.list.length === 0 ) {
            commit( 'updateUser', {
              tableList: [],
              paginationTotal: result.total,
            } )
            return
          }
          let list = result.list.map( ( { article_id, modify_time, operation } ) => {
            let operationName = ''
            if ( operation === 'collect' ) {
              operationName = '收藏'
            } else if ( operation === 'cancel' ) {
              operationName = '取消收藏'
            } else if ( operation === 'edit' ) {
              operationName = '编辑'
            } else if ( operation === 'create' ) {
              operationName = '创建'
            } else if ( operation === 'delete' ) {
              operationName = '删除'
            }
            return {
              article: article_id + '还没取值文章名，别忘了',
              date: modify_time,
              operation: operationName,
            }
          } )
          console.log( list )
          commit( 'updateUser', {
            tableList: list,
            paginationTotal: result.total,
          } )
        } else {
          console.log( msg )
        }
      } )
    },
    // 获取用户信息
    getUser( { commit } ) {
      userInfo().then( ( { success, result, code, msg } ) => {
        if ( success ) {
          // 登录
          commit( 'updateData', {
            isLogin: true,
          } )
          // 用户名称
          commit( 'updateMenu', {
            userName: result.user_name,
          } )
        } else {
          if ( code === 1999 ) {
            commit( 'updateData', {
              isLogin: false,
            } )
          } else {
            console.error( msg )
            // this.$message.error( msg || '错了哦，这是一条错误消息' );
          }
        }
      } )
    },
  }
} )
