import type { Router, RouteLocationNormalized } from 'vue-router'

import { useAppStoreWithOut } from '@/store/app'
import { useUserStoreWithOut } from '@/store/user'
import { RequestCanceler } from '@admin/service'
import { Modal, notification } from 'ant-design-vue'
import { warn } from '@admin/utils'
import { setRouteChange } from '@/logics/mitt/routeChange'
import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'
import { projectSetting } from '@admin/setting'
import { createParamMenuGuard } from './paramMenuGuard'
import nProgress from 'nprogress'

// Don't change the order of creation
// 根据单一职责去拆分成不同的独立函数去处理
export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createPageLoadingGuard(router)
  createHttpGuard(router)
  createScrollGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createParamMenuGuard(router) // must after createPermissionGuard (menu has been built.)
  createStateGuard(router)
}

/**
 * Hooks for handling page state 处理页面状态的钩子
 */
//创建页面守卫
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    // map.get() – 返回键对应的值，如果不存在，则返回 undefined。  ！！强制转换布尔类型
    to.meta.loaded = !!loadedPageMap.get(to.path)

    // Notify routing changes通知路由更改
    setRouteChange(to)

    return true
  })
  // map.set() – 设置键值对，返回该 Map 对象。
  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

// Used to handle page loading status处理页面加载状态
function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const appStore = useAppStoreWithOut()
  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true
    }
    if (to.meta.loaded) {
      return true
    }

    return true
  })
  router.afterEach(async () => {
    // TODO Looking for a better way
    // 定时器模拟加载时间，防止闪烁过快
    setTimeout(() => {
      appStore.setPageLoading(false)
    }, 220)
    return true
  })
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * 用于在路由切换时关闭当前页面以完成请求的接口
 * @param router
 */
function createHttpGuard(router: Router) {
  // projectsetting更改后需要清除浏览器缓存
  const { removeAllHttpPending } = projectSetting
  let requestCanceler: Nullable<RequestCanceler>
  if (removeAllHttpPending) {
    requestCanceler = new RequestCanceler()
  }
  router.beforeEach(async () => {
    // Switching the route will delete the previous request切换路由将删除上一个请求
    requestCanceler?.removeAllPending()
    return true
  })
}

// Routing switch back to the top 路由切换返回顶部
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href)
  }

  const body = document.body

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) &&
      body.scrollTo(0, 0)
    return true
  })
}

/**
 * Used to close the message instance when the route is switched
 * 用于在切换路由时关闭消息实例
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        Modal.destroyAll()
        notification.destroy()
      }
    } catch (error) {
      warn('message guard error:' + error)
    }
    return true
  })
}

export function createProgressGuard(router: Router) {
  const { openNProgress } = projectSetting
  if (!openNProgress) {
    return true
  }
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true
    }
    openNProgress && nProgress.start()
    return true
  })

  router.afterEach(async () => {
    openNProgress && nProgress.done()
    return true
  })
}
