import $axios from 'axios'

// 获取整个图形验证码
export function getList (data) {
  return $axios.get('/list', data)
}