import type { Menu } from '@/router/types'
import { defineStore } from 'pinia'
import { pinia } from '@/internal'
import { useI18n } from '@admin/locale'
import { useUserStore } from '@/store/user'
import { useAppStoreWithOut } from '@/store/app'
import { toRaw } from 'vue'
import {
  transformObjToRoute,
  flatMultiLevelRoutes,
} from '@/router/helper/routeHelper'
import { transformRouteToMenu } from '@/router/helper/menuHelper'
import { projectSetting } from '@admin/setting'
import { PermissionModeEnum, PageEnum, PermEnum } from '@admin/tokens'
import { asyncRoutes } from '@/router/routes'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { filterTree } from '@admin/utils'
import { getMenuList } from '@service/sys/menu'
import { useMessage } from '@/hooks/web/useMessage'
import { COMMON_MODULE, MODULE_CACHE } from '@enums/system'

interface PermissionState {
  // Permission code list权限代码列表
  permCodeList: string[] | number[]
  // has admin perm是否有管理员权限
  isAdminLessor: boolean
  // Whether the route has been dynamically added路由是否已动态添加
  isDynamicAddedRoute: boolean
  // To trigger a menu update触发菜单更新
  lastBuildMenuTime: number
  // black and reception menu list
  linkMenuList: Menu[]
  // backstage menu list后台菜单
  backMenuList: Menu[]
  // reception menu list
  frontMenuList: Menu[]
  // now module
  moduleId: string
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    // has admin perm
    isAdminLessor: false,
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // black and reception route
    linkMenuList: [],
    // backstage menu list
    backMenuList: [],
    // reception menu List
    frontMenuList: [],
    // now module
    moduleId: sessionStorage.getItem(MODULE_CACHE) || COMMON_MODULE,
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList
    },
    getAdminLessor(): boolean {
      return this.isAdminLessor
    },
    getLinkMenuList(): Menu[] {
      return this.linkMenuList
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
    getModuleId(): string {
      return this.moduleId
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList
      this.setAdminLessor(codeList)
    },

    setAdminLessor(codeList: string[]) {
      this.isAdminLessor = codeList.includes(PermEnum.ADMIN)
    },

    setLinkMenuList(list: Menu[]) {
      this.linkMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },

    setModuleId(moduleId: string | number) {
      this.moduleId = moduleId.toString()
    },

    resetState(): void {
      this.isDynamicAddedRoute = false
      this.permCodeList = []
      this.isAdminLessor = false
      this.linkMenuList = []
      this.backMenuList = []
      this.lastBuildMenuTime = 0
      this.moduleId = sessionStorage.getItem(MODULE_CACHE) || COMMON_MODULE
    },
    async changePermissionCode() {
      const userStore = useUserStore()
      const permList = toRaw(userStore.getPermCodeList) || []
      this.setPermCodeList(permList)
    },
    async buildRoutesAction(): Promise<RouteRecordItem[]> {
      const { t } = useI18n()
      const userStore = useUserStore()
      const appStore = useAppStoreWithOut()

      let routes: RouteRecordItem[] = []
      const roleList = toRaw(userStore.getRoleList) || []
      const { permissionMode = projectSetting.permissionMode } =
        appStore.getProjectConfig

      const routeFilter = (route: RouteRecordItem) => {
        const { meta } = route
        const { roles } = meta || {}
        if (!roles) return true
        return roleList.some((role) => roles.includes(role))
      }

      const routeRemoveIgnoreFilter = (route: RouteRecordItem) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: RouteRecordItem[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string =
          userStore.getUserInfo.homePath || PageEnum.BASE_HOME

        function patcher(routes: RouteRecordItem[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: RouteRecordItem) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }
        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }

      const { createMessage } = useMessage()
//处理不同
      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filterTree(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          // Convert multi-level routing to level 2 routing将多级路由转换为 2 级路由
          routes = flatMultiLevelRoutes(routes)
          break

        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filterTree(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          const menuList = transformRouteToMenu(routes, true)
          routes = filterTree(routes, routeRemoveIgnoreFilter)
          routes = routes.filter(routeRemoveIgnoreFilter)
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })

          this.setFrontMenuList(menuList as Menu[])
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes)
          break

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        case PermissionModeEnum.BACK:
          createMessage.loading(t('sys.app.menuLoading'))

          // !Simulate to obtain permission codes from the background,模拟以从后台获取权限代码
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList: RouteRecordItem[] = []
          try {
            this.changePermissionCode()
            routeList = (await getMenuList(
              this.getModuleId,
            )) as RouteRecordItem[]
          } catch (error) {
            console.error(error)
          }

          // Dynamically introduce components动态引入组件
          routeList = transformObjToRoute(routeList)

          //  Background routing to menu structure后台路由到菜单结构
          const backMenuList = transformRouteToMenu(routeList)
          this.setBackMenuList(backMenuList as Menu[])

          // remove meta.ignoreRoute item
          routeList = filterTree(routeList, routeRemoveIgnoreFilter)
          routeList = routeList.filter(routeRemoveIgnoreFilter)

          routeList = flatMultiLevelRoutes(routeList)
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]
          break

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        case PermissionModeEnum.LINK:
          createMessage.loading(t('sys.app.menuLoading'))

          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          routes = filterTree(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          const receptionList = transformRouteToMenu(routes, true)
          receptionList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })

          let backRouteList: RouteRecordItem[] = []
          try {
            this.changePermissionCode()
            const data: any = (await getMenuList(
              this.getModuleId,
            )) as RouteRecordItem[]
            backRouteList = data.result
            console.log(backRouteList)
          } catch (error) {
            console.error(error)
          }

          // Dynamically introduce components动态引入组件
          backRouteList = transformObjToRoute(backRouteList)

          //  Background routing to menu structure
          const backstageList = transformRouteToMenu(backRouteList)
          const linkRouteList = receptionList.concat(backstageList)
          this.setLinkMenuList(linkRouteList)

          // remove meta.ignoreRoute item
          routes = filterTree(
            routes.concat(backRouteList),
            routeRemoveIgnoreFilter,
          )
          routes = routes.filter(routeRemoveIgnoreFilter)

          routes = flatMultiLevelRoutes(routes)
          break
      }

      patchHomeAffix(routes)
      return routes
    },
  },
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(pinia)
}
