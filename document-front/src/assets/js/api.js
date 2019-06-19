// const domain = `http://${window.location.hostname}:8080/api/`
// const domain = '/api/'
const domain = ''

import { _get, _post, _put, _delete } from '@/plugins/axios'
// 获取一级列表 无需参数
export const getFirstList = () => {
  return _get(domain + '/list')
}

// 获取二级列表，参数为一级列表ID
export const getSecondList = (params) => {
  return _get(domain + '/list/getSecond', { params })
}

// 获取内容
export const getContent = (params) => {
  return _get(domain + '/article/getContent', { params })
}

// 获取历史记录
export const getHistory = (params) => {
  return _get(domain + '/getHistory', { params })
}

// 创建文章
export const articleCreate = (params) => {
  return _post(domain + '/article/create', params)
}

// 更新文章
export const articleUpdate = (params) => {
  return _put(domain + '/article/update', params)
}

// 删除文章
export const articleDelete = (params) => {
  return _delete(domain + '/article/delete', params)
}

// 收藏文章
export const articleCollect = (params) => {
  return _post(domain + '/collect', params)
}

// 取消收藏文章
export const articleCollectCancel = (params) => {
  return _delete(domain + '/collectCancel', params)
}

// 搜索
export const searchAll = (params) => {
  return _get(domain + '/search', { params })
}

// 用户相关
// 登录
export const userLogin = (params) => {
  return _post(domain + '/login', params)
}

// 注册
export const userReg = (params) => {
  return _post(domain + '/reg', params)
}

// 获取用户信息
export const userInfo = () => {
  return _post(domain + '/user/info')
}

// 创建记录
export const userCreateHistory = (params) => {
  return _get(domain + '/user/history/create', { params })
}

// 收藏记录
export const userCollectHistory = (params) => {
  return _get(domain + '/user/history/collect', { params })
}

// 操作记录
export const userOperationHistory = (params) => {
  return _get(domain + '/user/history/operation', { params })
}