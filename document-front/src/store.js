import Vue from 'vue'
import Vuex from 'vuex'
import { getContent, getCateList, userCreateHistory, userCollectHistory, userOperationHistory } from '@/assets/js/api'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isLogin: false,
    switchEditor: false,
    createShow: false,
    curId: 2, // 当前编辑文章id
    curItem: {},
    firstTitle: '',
    firstList: [],
    secondTitle: '',
    secondList: [],
    firstLevelId: -1, // 一级目录ID
    category: [], // 所有分类数据
    sideCategory: {}, // 当前侧边栏数据
    breadNav: [], // 面包屑数组
    activeIndex: '0', // 顶部导航
    artcileId: -1, // 当前操作文章ID
    activeIndex_second: '0',
    fromCreate: false,
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
    updateData(state, obj) {
      for (let key in obj) {
        state[key] = obj[key]
      }
    },
    updateUser(state, obj) {
      for (let key in obj) {
        state.user[key] = obj[key]
      }
    },
    updateUserAside(state) {
      let index = state.user.activeIndex
      let i = [1, 2]
      if (i.includes(index)) {
        state.user.tableHeader = [{
          label: '文章',
          value: 'article',
          width: 400
        }, {
          label: '操作',
          value: 'operation',
          width: 200
        }, {
          label: '日期',
          value: 'date',
          width: 300
        }]
      } else {
        state.user.tableHeader = [{
          label: '文章',
          value: 'article',
          width: 500
        }, {
          label: '日期',
          value: 'date',
          width: 300
        }]
      }
    },
    updateSideCategory(state, { firstLevelId }) {
      state.firstLevelId = firstLevelId
      const list = state.category.find(({ id }) => id === firstLevelId)
      state.sideCategory = list ? list : undefined
    }
  },
  actions: {
    getArticle({ commit, state }) {
      getContent({ id: state.artcileId }).then(({ success, result, msg }) => {
        if (success) {
          let data = {
            curItem: result,
            switchEditor: state.fromCreate,
          }
          commit('updateData', data)
        } else {
          commit('updateData', { curItem: {} })
          console.log('[error]获取文章接口：' + msg);
        }

      })
    },
    getCateListFn({ commit }) {
      // 初始化一级列表数据
      getCateList().then(({ success, result, msg }) => {
        if (success) {
          // 存储列表
          commit('updateData', {
            category: result,
            sideCategory: result[0]
          })
        } else {
          this.$message.error(msg);
        }
      })
    },
    getUserHistory({ commit, state }, params) {
      let index = state.user.activeIndex
      let ajaxFunction = userCreateHistory
      index === 1 && (ajaxFunction = userCollectHistory)
      index === 2 && (ajaxFunction = userOperationHistory)
      ajaxFunction(params).then(({ success, result, msg }) => {
        if (success) {
          if (result.list && result.list.length === 0) {
            commit('updateUser', {
              tableList: [],
              paginationTotal: result.total,
            })
            return
          }
          let list = result.list.map(({ article_id, modify_time, operation }) => {
            let operationName = ''
            if (operation === 'collect') {
              operationName = '收藏'
            } else if (operation === 'cancel') {
              operationName = '取消收藏'
            } else if (operation === 'edit') {
              operationName = '编辑'
            } else if (operation === 'create') {
              operationName = '创建'
            } else if (operation === 'delete') {
              operationName = '删除'
            }
            return {
              article: article_id + '还没取值文章名，别忘了',
              date: modify_time,
              operation: operationName,
            }
          })
          commit('updateUser', {
            tableList: list,
            paginationTotal: result.total,
          })
        } else {
          console.log(msg)
        }
      })
    },
  }
})
