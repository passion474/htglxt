interface userInfos {
  // 定义一个 用户 规范接口
  id: string // 工号
  name: string // 姓名
  nation: string // 民族
  organization: string // 机构
  section: string // 部门
  tel: string // 手机号
  location: string // 户籍所在地
  address: string // 家庭住址
}
// 模拟数据
const Mock = require('mockjs')
const Random = Mock.Random
let userInfo: Array<userInfos> = []
const count = 20 // 源数据条数
for (let i = 0; i < count; i += 1) {
  userInfo.push({
    id: i + 1 + '', // 工号
    name: Random.cname(), // 姓名
    nation: '汉', // 民族
    organization: '东华软件', // 机构
    section: '金融', // 部门
    tel: '15667130116', // 手机号
    location: '陕西', // 户籍所在地
    address: '西安', // 家庭住址
  })
}
// let user: Array<userInfos> = [];
// console.log('userInfo:::', userInfo);
// 增加接口
const addUserInfo = (option) => {
  console.log(option.body)
  // 传递的参数存在
  let code = 200
  const { id, name, nation, organization, section, tel, location, address } =
    option.body
  userInfo.forEach((item) => {
    if (item.id === id) {
      code = 500
    }
  })
  if (code === 500) {
    return { code }
  } else {
    // 重构对象数据
    const obj = {
      id, // 工号
      name, // 姓名
      nation, // 民族
      organization, // 机构
      section, // 部门
      tel, // 手机号
      location, // 户籍所在地
      address, // 家庭住址
    }
    console.log('obj:::', obj)
    userInfo.push(obj)
    let result = {
      items: userInfo,
      total: userInfo.length,
      code,
    }
    return result
  }
}
// 删除信息
const deleteUserInfo = (option) => {
  if (option) {
    console.log(option)
    const { id } = option.body
    console.log('id:::', id)
    let index = userInfo.findIndex((item) => item.id === id)
    userInfo.splice(index, 1)
    let result = {
      items: userInfo,
      total: userInfo.length,
      code: 200,
    }
    return result
  }
  return { code: 500 }
}
// 修改信息
const editUserInfo = (options) => {
  if (options) {
    // id 对应的是工号，是唯一的
    const data = options.body
    console.log('data:::', data)

    userInfo.forEach((item, index) => {
      if (item.id === data.id) {
        userInfo[index] = { ...userInfo[index], ...data }
      }
    })
    console.log('userInfo:::', userInfo)
    let result = {
      items: userInfo,
      total: userInfo.length,
      code: 200,
    }
    return result
  }
  return { code: 500 }
}
// 查询接口，因为表格的原因，不需要传值，会自动传值
const getUserInfo = (options) => {
  let queryParams = options.query
  console.log(!queryParams.name)
  let data = []
  // 分两种情况
  // 第一种： 没有传递参数，返回所有的数据
  // 第二种： 有参数，根据参数返回
  if (!queryParams.name && !queryParams.organization && !queryParams.section) {
    data = [...userInfo]
  } else {
    let newQueryObj = {}
    // 这一步是将查询的对象进行筛选，把空的值去掉
    for (let [key, value] of Object.entries(queryParams)) {
      if (
        value &&
        (key === 'name' || key === 'organization' || key === 'section')
      ) {
        newQueryObj[key] = value
      }
    }
    console.log('newQueryObj:::', newQueryObj)
    // 查询一个对象是否包含另外一个对象
    let contains = (a, b) =>
      Object.entries(b).every(([k, v]) => {
        return a[k] === v
      })
    data = userInfo.reduce((pre: Array<userInfos>, item) => {
      if (contains(item, newQueryObj)) {
        pre.push(item)
      }
      return pre
    }, [])
  }
  const datas = [...data]
  let result = {
    items: datas,
    total: datas.length,
    code: 200,
  }
  return result
}

export { addUserInfo, deleteUserInfo, editUserInfo, getUserInfo }
