import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'
// LoginRoute,
// RootRoute,
// REDIRECT_ROUTE,
// PAGE_NOT_FOUND_ROUTE,
// userCenter,

// 白名单应该包含基本静态路由。白名单：不受路由守卫控制直接放行
const WHITE_NAME_LIST: string[] = []

;(() => {
  const getRouteNames = (array: any[]) =>
    array.forEach((item) => {
      WHITE_NAME_LIST.push(item.name)
      getRouteNames(item.children || [])
    })

  getRouteNames(basicRoutes)
})()

// app router
// 创建路由实例并传递 `routes` 配置
export const router = createRouter({
  // hash历史模式
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表
  routes: basicRoutes,
  // strict默认为false，如果为true时，路由后面有斜杠而url中没有斜杠，是不匹配的
  strict: true,
  //切换路由时，页面跳转位置
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// reset router重置路由
export const resetRouter = () => {
  //获取路由
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      // hasRoute确认是否存在指定名称的路由。removeRoute通过名称删除现有路由。
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// config router配置路由
export const setupRouter = (app: App<Element>) => app.use(router)
