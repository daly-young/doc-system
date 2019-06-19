import Vue from 'vue'
import Vuex from 'vuex'
import { getContent, getSecondList, userCreateHistory, userCollectHistory, userOperationHistory } from '@/assets/js/api'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    switchEditor: false,
    createShow: false,
    curId: 2, // 当前编辑文章id
    curItem: {},
    firstId: 1,
    firstTitle: '',
    firstList: [],
    secondTitle: '',
    secondList: [],
    activeIndex_first: '0',
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
      if (index === 1 || index === 2) {
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
  },
  actions: {
    getArticle({ commit, state }) {
      getContent({ id: state.curId }).then(({ success, result, msg }) => {
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
    getSecondListFn({ commit, state, dispatch }) {
      getSecondList({
        id: state.firstId
      }).then(({ success, result, msg }) => {
        if (success) {
          commit('updateData', {
            secondList: result,
          })
          if (state.fromCreate) {
            let param = result.find((item) => {
              return item.article_id == state.curId
            })
            commit('updateData', {
              activeIndex_second: state.curId.toString(),
              fromCreate: false,
              curItem: {},
              secondTitle: param.name
            })
            return
          }
          let { article_id, name } = result[0]
          commit('updateData', {
            curId: article_id,
            activeIndex_second: article_id.toString(),
            secondTitle: name,
          })
          return dispatch('getArticle', result[0])
        } else {
          console.log(msg)
          // this.$message.error(msg);
        }
      })
    },
    getUserHistory({ commit, state }, params) {
      let index = state.user.activeIndex
      // dispatch('changeUserAside')
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
