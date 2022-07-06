import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic'
import { PageEnum } from '@admin/tokens'
// export enum PageEnum {
//   // basic login path
//   BASE_LOGIN = '/login',
//   // basic home path
//   BASE_HOME = '/dashboard',
//   // userCenter path
//   USER_CENTER = '/userCenter',
//   // enterpriseCenter path
//   ENTERPRISE_CENTER = '/enterpriseCenter',
//   // error page path
//   ERROR_PAGE = '/exception',
//   // error log page path
//   ERROR_LOG_PAGE = '/error-log/list',
// }
import { t } from '@admin/locale'
import userCenter from '@/router/routes/modules/userCenter'
//路由模块化记录，，import.meta.globEager：批量导入
const routeModuleRecord = import.meta.globEager('./modules/**/*.ts')

const routeModules: RouteRecordItem[] = []

Object.keys(routeModuleRecord).forEach((key) => {
  const routeModule = routeModuleRecord[key].default || {}
  routeModules.push(
    ...(Array.isArray(routeModule) ? [...routeModule] : [routeModule]),
  )
})
//异步路由
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModules]
//根路由
export const RootRoute: RouteRecordItem = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}
//登录路由
export const LoginRoute: RouteRecordItem = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
}

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  userCenter,
]
