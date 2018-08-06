import axios from './http'
// 发送get请求(返回一个Promise)
const get = (url, param) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: param })
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

/* eslint-disable */
// 发送post请求(返回一个Promise)
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// 获取注册码
const getMenuData = () => {
  return get('/static/json/menu.json', null)
}

export default {
  getMenuData: getMenuData
}
