import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/dev-api/code',
    method: 'get',
    response: ({ query }) => {
      return {
        img: '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',
        captchaOnOff: true,
        uuid: '80006acd1032411eaba05cb5e8e8ece6',
        code: 200,
        type: 'success',
        message: '操作成功',
      }
    },
  },
  {
    url: '/dev-api/auth/login',
    method: 'post',
    response: ({ query }) => {
      return {
        access_token:
          'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOiIwMCIsInVzZXJfaWQiOiIxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJpc19sZXNzb3IiOiJZIiwidXNlcl9rZXkiOiIwNWNjMTIxNS04ZjZhLTQyYWUtOGJlMi0xODJjNjZlN2E4NDEiLCJlbnRlcnByaXNlX2lkIjoiMSIsImVudGVycHJpc2VfbmFtZSI6ImFkbWluaXN0cmF0b3IiLCJzb3VyY2VfbmFtZSI6InNsYXZlIn0.9Kk2WtwexwDFSeZVfL9c_UqtVsjUq6H0fj89frHsXPl0YKdK2bVH9V2xM0PaT7bGbQO-NIlo3ike8mpdzAVyfA',
        expires_in: 720,

        code: 200,
        type: 'success',
        message: '操作成功',
      }
    },
  },
  {
    url: '/dev-api/system/user/getInfo',
    method: 'get',
    response: ({ query }) => {
      return {
        routes: {
          '8f9c168080054f2a89ac25966c5c1190': '/asyncRouteTest',
          '8f9c168080054f2a89ac25966c5c1191':
            '/asyncRouteTest/asyncRouteTestPage',
        },
        permissions: ['*:*:*'],
        roles: ['administrator', 'admin'],
        user: {
          id: '1',
          params: {},
          status: '0',
          sort: 0,
          remark: '超级管理员',
          createTime: '2022-05-06 20:52:57',
          updateBy: '1',
          code: '001',
          userName: 'admin',
          nickName: 'admin',
          userType: '00',
          phone: '',
          email: '',
          avatar:
            'https://images.gitee.com/uploads/images/2021/1101/141155_f3dfce1d_7382127.jpeg',
          password: '',
          defaultRoleId: '1',
          deptNo: '000001',
          roles: [],
          notAdmin: false,
          admin: true,
        },
        code: 200,
        type: 'success',
        message: '操作成功',
      }
    },
  },
  {
    url: '/dev-api/system/enterprise/getInfo',
    method: 'get',
    response: ({ query }) => {
      return {
        id: '1',
        params: {},
        name: 'administrator',
        status: '0',
        sort: 0,
        createTime: '2022-05-06 21:45:18',
        strategyId: '1',
        systemName: '租管租户',
        homePath: '/asyncRouteTest',
        nick: 'xueYi1',
        logo: 'https://images.gitee.com/uploads/images/2021/1101/141601_d68e92a4_7382127.jpeg',
        isLessor: 'Y',
        nameFrequency: '0',
        isDefault: 'Y',
        admin: true,

        code: 200,
        type: 'success',
        message: '操作成功',
      }
    },
  },
  {
    url: '/dev-api/system/menu/getRouters/1',
    method: 'get',
    response: ({ query }) => {
      return {
        result: [
          {
            name: '8f9c168080054f2a89ac25966c5c1190',
            path: '/asyncRouteTest',
            component: 'LAYOUT',
            disabled: false,
            redirect: '/asyncRouteTest/asyncRouteTestPage',
            meta: {
              title: '异步测试平台',
              icon: 'ant-design:container-twotone',
              dynamicLevel: 0,
              ignoreKeepAlive: false,
              affix: false,
              hideBreadcrumb: false,
              hideChildrenInMenu: false,
              hideTab: false,
              hideMenu: false,
              orderNo: 1,
              ignoreRoute: false,
              hidePathForChildren: false,
            },
            children: [
              {
                name: '8f9c168080054f2a89ac25966c5c1191',
                path: 'asyncRouteTestPage',
                component: '/asyncRouteTest/asyncRouteTestPage/index.vue',
                disabled: false,
                meta: {
                  title: '异步测试页面',
                  icon: 'ant-design:right-outlined',
                  dynamicLevel: 0,
                  ignoreKeepAlive: false,
                  affix: false,
                  hideBreadcrumb: false,
                  hideChildrenInMenu: false,
                  hideTab: false,
                  hideMenu: false,
                  orderNo: 1,
                  ignoreRoute: false,
                  hidePathForChildren: false,
                },
              },
            ],
          },
        ],
        code: 200,
        type: 'success',
        message: '操作成功',
      }
    },
  },
] as MockMethod[]
