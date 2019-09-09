
import { _get, _post, _put, _delete } from '@/plugins/axios'
// // 获取一级列表 无需参数
// export const getFirstList = () => {
//   return _get('/list')
// }

// // 获取二级列表，参数为一级列表ID
// export const getSecondList = (params) => {
//   return _get('/list/getSecond', { params })
// }

// 获取当前所有分类
export const getCateList = ( params ) => {
  return _get( '/list/category', { params } )
}

// 获取当前所有文件夹
export const getFolders = ( params ) => {
  return _get( '/list/folders', { params } )
}

// 获取内容
export const getContent = ( params ) => {
  return _get( '/article/getContent', { params } )
}

// 获取历史记录
export const getHistory = ( params ) => {
  return _get( '/getHistory', { params } )
}

// 创建文章
export const articleCreate = ( params ) => {
  return _post( '/article/create', params )
}

export const articleCreateOnly = ( params ) => {
  return _post( '/article/articleCreateOnly', params )
}

// 更新文章
export const articleUpdate = ( params ) => {
  return _put( '/article/update', params )
}

// 删除文章
export const articleDelete = ( params ) => {
  return _delete( '/article/delete', params )
}

// 收藏文章
export const articleCollect = ( params ) => {
  return _post( '/collect', params )
}

// 取消收藏文章
export const articleCollectCancel = ( params ) => {
  return _delete( '/collectCancel', params )
}

// 搜索
export const searchAll = ( params ) => {
  return _get( '/search', { params } )
}

// 用户相关
// 登录
export const userLogin = ( params ) => {
  return _post( '/login', params )
}

// 注册
export const userReg = ( params ) => {
  return _post( '/reg', params )
}

// 获取用户信息
export const userInfo = () => {
  return _post( '/user/info' )
}

// 创建记录
export const userCreateHistory = ( params ) => {
  return _get( '/user/history/create', { params } )
}

// 收藏记录
export const userCollectHistory = ( params ) => {
  return _get( '/user/history/collect', { params } )
}

// 操作记录
export const userOperationHistory = ( params ) => {
  return _get( '/user/history/operation', { params } )
}