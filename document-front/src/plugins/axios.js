import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import { handleResult } from '@/assets/js/base'
import { Loading } from 'element-ui';
Vue.use( VueAxios, axios )


// 路由请求拦截
// http request 拦截器
let loadingInstance
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service( { fullscreen: true } );
    config.baseURL = '/api/'
    config.headers['withCredentials'] = true;
    config.headers['Access-Control-Allow-Credentials'] = true;
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  },
  error => {
    return Promise.reject( error.response );
  } );

// Access-Control-Allow-Credentials

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
  response => {
    loadingInstance.close()
    return response;
  },
  error => {
    return Promise.reject( error.response )   // 返回接口返回的错误信息
  } );



export function _get( url, params = {} ) {
  return new Promise( ( resolve, reject ) => {
    Vue.axios.get( url, params )
      .then( response => {
        resolve( handleResult( response.data ) );
      }, err => {
        reject( err )
      } )
  } )
}

export function _post( url, params = {} ) {
  return new Promise( ( resolve, reject ) => {
    Vue.axios.post( url, qs.stringify( params ) )
      .then( response => {
        resolve( response.data );
      }, err => {
        reject( err )
      } )
  } )
}

export function _put( url, params = {} ) {
  return new Promise( ( resolve, reject ) => {
    Vue.axios.put( url, qs.stringify( params ) )
      .then( response => {
        resolve( response.data );
      }, err => {
        reject( err )
      } )
  } )
}

export function _delete( url, params = {} ) {
  return new Promise( ( resolve, reject ) => {
    Vue.axios.delete( url, { params } )
      .then( response => {
        resolve( response.data );
      }, err => {
        reject( err )
      } )
  } )
}