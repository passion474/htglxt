import type { MenuModule, Menu } from '@/router/types'

import { isUrl, cloneDeep, findTreeParentPath, treeMap } from '@admin/utils'
import { RouteParams } from 'vue-router'
import { toRaw } from 'vue'
//获取所有父路径
export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findTreeParentPath(
    treeData,
    (n) => n.path === path,
  ) as Menu[]
  return (menuList || []).map((item) => item.path)
}
// 路径处理
function joinParentPath(menus: RouteRecordItem[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.允许利用组件嵌套，而不必使用嵌套 URL
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      // 路径不以 / 开头，也不是 url，加入父路径
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(
        menu.children,
        menu.meta?.hidePathForChildren ? parentPath : menu.path,
      )
    }
  }
}

// Parsing the menu module解析菜单模块
// 转换菜单模块
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule

  const menuList = [menu] as RouteRecordItem[]

  joinParentPath(menuList)
  return menuList[0]
}
// 转换路由到菜单
export function transformRouteToMenu(
  routeModList: RouteRecordItem[],
  routerMapping = false,
) {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: RouteRecordItem[] = []
  // 对路由项进行修改
  cloneRouteModList.forEach((item) => {
    if (
      routerMapping &&
      item.meta?.hideChildrenInMenu &&
      typeof item.redirect === 'string'
    ) {
      item.path = item.redirect
    }
    if (item.meta?.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })
  // 提取树指定结构
  const list = treeMap(routeList, {
    conversion: (node: RouteRecordItem) => {
      const { meta: { title, hideMenu = false } = {} } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      }
    },
  })
  // 路径处理
  joinParentPath(list)
  return cloneDeep(list)
}

/**
 * config menu with given params配置带参数的菜单
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g
export function configureDynamicParamsMenu(menu: Menu, params: RouteParams) {
  const { path, paramPath } = toRaw(menu)
  let realPath = paramPath ? paramPath : path
  const matchArr = realPath.match(menuParamRegex)

  matchArr?.forEach((it) => {
    const realIt = it.substr(1)
    if (params[realIt]) {
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string)
    }
  })
  // save original param path.
  if (!paramPath && matchArr && matchArr.length > 0) {
    menu.paramPath = path
  }
  menu.path = realPath
  // children
  menu.children?.forEach((item) => configureDynamicParamsMenu(item, params))
}
