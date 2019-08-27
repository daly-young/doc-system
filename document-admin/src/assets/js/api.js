import { _get, _put, _delete } from './request'

// 获取文章
export const getArticles = (params) => {
  return _get('/admin/article/listAll', { params })
}

// 删除文章
export const delArticles = (params) => {
  return _delete('/article/delete', { params })
}

// 获取类目
export const getCates = (params) => {
  return _get('/admin/list/category', { params })
}

// 删除类目及下面所有文章
export const delCates = (params) => {
  return _delete('/admin/list/category', { params })
}

// 获取分类
export const getClasses = (params) => {
  return _get('/admin/list/classification', { params })
}

// 更新分类名称
export const editClasses = (params) => {
  return _put('/admin/list/classification', { params })
}

// 删除分类，但并不能删除这个分类的文章
export const delClasses = (params) => {
  return _delete('/admin/list/classification', { params })
}

// 获取标签
export const getTags = (params) => {
  return _get('/admin/list/tag', { params })
}

// 编辑标签
export const editTags = (params) => {
  return _put('/admin/list/tag', { params })
}

// 删除标签，但并不能删除这个标签的文章
export const delTags = (params) => {
  return _delete('/admin/list/tag', { params })
}

// 获取用户
export const getUsers = (params) => {
  return _get('/admin/list/user', { params })
}

// 下线用户，这个用户不能登录，但是其所有操作痕迹都保留
export const downlineUsers = (params) => {
  return _put('/admin/list/user', { params })
}

// 修改用户权限
export const editUsers = (params) => {
  return _put('/admin/edit/user', { params })
}