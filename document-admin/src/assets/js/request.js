import * as axios from 'axios'
import QS from 'qs';
import { message } from 'antd';

// 全局设定请求类型
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 根据 axios api，对请求返回做拦截处理
axios.interceptors.response.use(function (response) {
  if (response.status >= 400 && response.status < 500) {
    // 对返回状态码为 4xx 的请求统一处理
    // 此处统一跳转 404 页面
    window.location.href = decodeURI(`${window.location.protocol}//${window.location.host}/404.html`)
  } else {
    return response
  }
}, function (error) {
  message.info(error || '获取失败');
})

export function _get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

export function _post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function _put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function _delete(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, { params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  })
}