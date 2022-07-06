// test.ts
import { MockMethod } from 'vite-plugin-mock'
import { addUserInfo, deleteUserInfo, editUserInfo, getUserInfo } from './user'
export default [
  // 增加信息的接口
  {
    url: '/dev-api/api/addUserInfo',
    method: 'post',
    response: addUserInfo,
  },
  // 删除信息的接口
  {
    url: '/dev-api/api/deleteUserInfo',
    method: 'delete',
    response: deleteUserInfo,
  },
  // 修改信息的接口
  {
    url: '/dev-api/api/editUserInfo',
    method: 'put',
    response: editUserInfo,
  },
  // 根据表单搜索查询
  {
    url: '/dev-api/api/getUserInfo',
    method: 'get',
    response: getUserInfo,
  },
] as MockMethod[]
