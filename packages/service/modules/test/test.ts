import { defaultRequest } from '../../request'
// 枚举
enum Api {
  ADD_USER_INFO = '/api/addUserInfo',
  DELETE_USER_INFO = '/api/deleteUserInfo',
  EDIT_USER_INFO = '/api/editUserInfo',
  GET_USER_INFO = '/api/getUserInfo',
  QUERY_USER_INFO = '/api/queryUserInfo',
  QUERY_PAGE_INFO = '/api/queryPageUserInfo',
  TEST_MODULE = '/api/get'
}

// 测试接口
export const test = (params) => 
  defaultRequest.post({url: Api.TEST_MODULE, params})
/**
 * 增加用户信息接口
 * 传递一个完整的用户信息
 * params: {
      id, // 工号
      name, // 姓名
      nation, // 民族
      organization, // 机构
      section, // 部门
      tel, // 手机号
      location, // 户籍所在地
      address // 家庭住址
    }
 * */
export const addUserInfo = (params) => 
  defaultRequest.post({url: Api.ADD_USER_INFO, params})
/** 删除用户信息接口
 * 删除接口: 
 * 单个删除传递的是点击当前列的索引，
 * 多选删除，需要传递的是一个数组，这个数组包含多个列的索引
 * 单个接口： id: 1
 * 多个接口： id: [1,2,3]
*/
export const deleteUserInfo = (params) => 
  defaultRequest.delete({url: Api.DELETE_USER_INFO, params})
/** 
 * 修改用户信息接口
 * 修改接口需要传递两个值，第一个是修改后的表单数据（data）类型object，第二个是点击修改列的索引值（id）类型number
 * { 
 *  data: {
 *    id: 2, // 工号
      name: '111', // 姓名
      nation: '222', // 民族
      organization: '333', // 机构
      section: '444', // 部门
      tel: '123', // 手机号
      location: '11', // 户籍所在地
      address: '222' // 家庭住址
    }, 
    id: 2
  }
 *  */
export const editUserInfo = (params) => 
  defaultRequest.put({url: Api.EDIT_USER_INFO, params})
/**
 * 根据表单搜素查询
 * 表单查询，可以一个条件或者多个条件查询
 * {id: 2， name:'张三'}
 * */
export const getUserInfo = (params) => 
  defaultRequest.get({url: Api.GET_USER_INFO, params})
/**
 * 查询全部
 * 不用传递参数，直接调接口
 * */
export const queryUserInfo = () => 
  defaultRequest.get({url: Api.QUERY_USER_INFO})
/**
 * 分页查询信息
 * 根据分页查询，需要传递两个参数
 * 第一个参数是当前的页码
 * 第二个参数是一页需要显示几条数据
 * {
 *  current： 1,
 *  pageSize: 10
 * }
 * */
export const queryPageUserInfo = (params) => 
  defaultRequest.get({url: Api.QUERY_PAGE_INFO, params})