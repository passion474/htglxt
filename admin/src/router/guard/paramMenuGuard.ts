import type { Router } from 'vue-router'
import { configureDynamicParamsMenu } from '../helper/menuHelper'
import { Menu } from '../types'
import { PermissionModeEnum } from '@admin/tokens'
import { useAppStoreWithOut } from '@/store/app'

import { usePermissionStoreWithOut } from '@/store/permission'
//参数菜单按钮
export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, _, next) => {
    // filter no name route过滤无名路由
    if (!to.name) {
      next()
      return
    }

    // menu has been built.
    if (!permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    let menus: Menu[] = []
    if (isLinkMode()) {
      menus = permissionStore.getLinkMenuList
    } else if (isBackMode()) {
      menus = permissionStore.getBackMenuList
    } else if (isRouteMappingMode()) {
      menus = permissionStore.getFrontMenuList
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))

    next()
  })
}
// 获取权限
const getPermissionMode = () => {
  const appStore = useAppStoreWithOut()
  return appStore.getProjectConfig.permissionMode
}

const isLinkMode = () => {
  return getPermissionMode() === PermissionModeEnum.LINK
}

const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}
