import axios from 'axios'
import qs from 'qs'

const _post = (api, data) => {
  let params = qs.stringify(data)
  return new Promise((resolve, reject) => {
    axios.post(api, params).then((res) => {
      resolve(res)
    })
  })
}

const _get = (api, data) => {
  let params = qs.stringify(data)
  return new Promise((resolve, reject) => {
    axios.get(api, params).then((res) => {
      resolve(res)
    })
  })
}

export { _post, _get }