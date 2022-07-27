import {request} from './index.js'


export function _login(phone,password){
  return request({
    url:'/login/cellphone',
    params:{
      phone,
      password
    }
  })
}