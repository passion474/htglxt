import type { Router } from 'vue-router'
import { useAppStore } from '@/store/app'
import { useMultipleTabStore } from '@/store/multipleTab'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import { PageEnum } from '@admin/tokens'
import { removeTabChangeListener } from '@/logics/mitt/routeChange'

export function createStateGuard(router: Router) {
  // 全局后置钩子
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    //进入登入页面清除身份验证信息
    if (to.path === PageEnum.BASE_LOGIN) {
      const tabStore = useMultipleTabStore()
      const userStore = useUserStore()
      const appStore = useAppStore()
      const permissionStore = usePermissionStore()
      appStore.resetAllState()
      permissionStore.resetState()
      tabStore.resetState()
      userStore.resetState()
      removeTabChangeListener()
    }
  })
}
