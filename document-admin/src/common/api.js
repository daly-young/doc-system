import { _post, _get } from './request'

// 文章列表
export const articleList = (params) => {
  return _get('/admin/list/article', params)
}

// 目录列表
export const catalogList = (params) => {
  return _get('/admin/list/catalog', params)
}

// 标签管理
export const tagList = (params) => {
  return _get('/admin/list/tag', params)
}

// 增加标签
export const tagAdd = (params) => {
  return _get('/admin/list/tag/add', params)
}

// 删除标签
export const tagDel = (params) => {
  return _get('/admin/list/tag/del', params)
}

// 编辑标签
export const tagEdit = (params) => {
  return _get('/admin/list/tag/edit', params)
}

// 分类管理
export const classificationList = (params) => {
  return _get('/admin/list/classification', params)
}

// 增加分类
export const classificationAdd = (params) => {
  return _get('/admin/list/classification/add', params)
}

// 删除分类
export const classificationDel = (params) => {
  return _get('/admin/list/classification/del', params)
}

// 编辑分类
export const classificationEdit = (params) => {
  return _get('/admin/list/classification/edit', params)
}

// 用户管理
export const userList = () => {
  return _get('/admin/list/user', null)
}

// 修改邮箱
// 修改权限
// 使无效
// 删除
// 修改密码
// 修改用户名