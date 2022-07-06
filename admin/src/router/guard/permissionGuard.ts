import type { Router } from 'vue-router'

import { usePermissionStoreWithOut } from '@/store/permission'
// usePermissionStore是在src\store\modules\permission.ts定义的
// usePermissionStore用来拿取用户全部的权限，然后添加对应的路由
import { PageEnum } from '@admin/tokens'
//  // basic login path
//  BASE_LOGIN = '/login',
//  // basic home path
//  BASE_HOME = '/dashboard',
//  // userCenter path
//  USER_CENTER = '/userCenter',
//  // enterpriseCenter path
//  ENTERPRISE_CENTER = '/enterpriseCenter',
//  // error page path
//  ERROR_PAGE = '/exception',
//  // error log page path
//  ERROR_LOG_PAGE = '/error-log/list',
import { useUserStoreWithOut } from '@/store/user'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { RootRoute } from '@/router/routes'
//登陆路径
const LOGIN_PATH = PageEnum.BASE_LOGIN
//根路径
const ROOT_PATH = RootRoute.path
//登陆路径为白名单（白名单为了防止死循环）
const whitePathList: PageEnum[] = [LOGIN_PATH]
//创建许可路由
export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()
  //全局前置守卫 router.beforeEach前置守卫处理路由：vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航，async指定为异步守卫
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath)
      return
    }

    const token = userStore.getToken

    // Whitelist can be directly entered，token存在，判断session是否超时后跳转
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout
        try {
          await userStore.afterLoginAction()
          //如果登录没过期跳转到相应页面
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/')
            return
          }
        } catch {}
      }
      next()
      return
    }

    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // redirect login page
      const redirectData: {
        path: string
        replace: boolean
        query?: Recordable<string>
      } = {
        path: LOGIN_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    }

    // Jump to the 404 page after processing the login
    //fullpath带参数的全路径
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
      return
    }

    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()
    //添加路由权限
    routes.forEach((route) => {
      router.addRoute(route)
    })

    router.addRoute(PAGE_NOT_FOUND_ROUTE)

    permissionStore.setDynamicAddedRoute(true)

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}
