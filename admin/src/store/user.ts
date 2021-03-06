import { defineStore } from 'pinia'
import { PageEnum, TenantTypeEnum, UserTypeEnum } from '@admin/tokens'
import { isArray } from '@admin/utils'
import { useI18n } from '@admin/locale'
import { pinia } from '@/internal'
import {
  getEnterpriseInfo,
  getUserInfo,
  loginApi,
  doLogout,
  getCodeImg,
} from '@service/sys/login'
import { useMessage } from '@/hooks/web/useMessage'
import { router } from '@/router'
import { usePermissionStore } from '@/store/permission'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { h } from 'vue'
import { GetEnterpriseIM, GetUserIM, LoginPM } from '@type/sys'
import { EnterpriseIM, UserIM } from '@type/system'
import { ErrorMessageMode } from '@admin/types'
import { isMap } from '@vue/shared'
import { DicCommonPrivateEnum } from '@enums/basic'
import { MODULE_CACHE } from '@enums/system'

interface UserState {
  enterpriseInfo: Nullable<EnterpriseIM>
  userInfo: Nullable<UserIM>
  token?: string
  expires_in?: number
  roleList: string[]
  permCodeList: string[]
  routePathMap: Nullable<Map<string, string>>
  sessionTimeout?: boolean
  lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'app-user',
  persist: {
    strategies: [
      {
        paths: [
          'enterpriseInfo',
          'userInfo',
          'token',
          'roleList',
          'permCodeList',
          'routePathMap',
        ],
      },
    ],
  },
  state: (): UserState => ({
    // enterprise info
    enterpriseInfo: null,
    // user info
    userInfo: null,
    // token
    token: undefined,
    // expires_in
    expires_in: 0,
    // roleList
    roleList: [],
    // permCodeList
    permCodeList: [],
    // routePathMap
    routePathMap: null,
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getEnterpriseInfo(): EnterpriseIM {
      return this.enterpriseInfo || ({} as EnterpriseIM)
    },
    getUserInfo(): UserIM {
      return this.userInfo || ({} as UserIM)
    },
    getToken(): string {
      return this.token as string
    },
    getExpiresIn(): number {
      return this.expires_in as number
    },
    getRoleList(): string[] {
      return this.roleList.length > 0 ? this.roleList : []
    },
    getPermCodeList(): string[] {
      return this.permCodeList.length > 0 ? this.permCodeList : []
    },
    getRoutePathMap(): Map<string, string> {
      return this.routePathMap !== null
        ? this.routePathMap
        : new Map<string, string>()
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
    isNotLessor(): boolean {
      return !this.isLessor
    },
    isLessor(): boolean {
      return (
        this.enterpriseInfo !== null &&
        this.enterpriseInfo.isLessor === TenantTypeEnum.ADMIN
      )
    },
    isNotAdmin(): boolean {
      return !this.isAdmin
    },
    isAdmin(): boolean {
      return (
        this.userInfo !== null && this.userInfo.userType === UserTypeEnum.ADMIN
      )
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token ? token : '' // for null or undefined value
    },
    setExpiresIn(expires_in: number | undefined) {
      this.expires_in = expires_in ? expires_in : 0 // for null or undefined value
    },
    setRoleList(roleList: string[]) {
      this.roleList = roleList
    },
    setPermCodeList(permCodeList: string[]) {
      this.permCodeList = permCodeList
    },
    setRoutePathMap(routePathMap: Map<string, string> | null) {
      this.routePathMap = routePathMap
    },
    setEnterpriseInfo(info: Nullable<EnterpriseIM>) {
      this.enterpriseInfo = info
    },
    setUserInfo(info: Nullable<UserIM>) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    useCommon(isCommon: string): boolean {
      return !(isCommon === DicCommonPrivateEnum.COMMON && this.isNotLessor)
    },
    resetState() {
      this.enterpriseInfo = null
      this.userInfo = null
      this.token = ''
      this.expires_in = 0
      this.roleList = []
      this.permCodeList = []
      this.routePathMap = null
      this.sessionTimeout = false
    },
    getRoutePath(name: string, param?: string) {
      if (this.routePathMap == null) {
        const { createMessage } = useMessage()
        createMessage.warning('???????????????')
      } else {
        const path = this.routePathMap.get(name)
        if (path !== undefined) {
          param !== undefined ? router.push(path + param) : router.push(path)
        } else {
          const { createMessage } = useMessage()
          createMessage.warning('??????????????????')
        }
      }
    },
    /**
     * @description: login
     */
    async login(
      params: LoginPM & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<GetUserIM | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params

        const data = await loginApi(loginParams, mode)
        const { access_token } = data

        // save token
        this.setToken(access_token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserIM | null> {
      if (!this.getToken) {
        return null
      }
      // get info
      const getInfo = await this.getUserInfoAction()
      // get enterprise info
      this.getEnterpriseInfoAction()

      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStore()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach((route) => {
            router.addRoute(route)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE)
          permissionStore.setDynamicAddedRoute(true)
        }
        goHome &&
          (await router.replace(getInfo?.user?.homePath || PageEnum.BASE_HOME))
      }
      return getInfo
    },

    async getUserInfoAction(): Promise<GetUserIM | null> {
      if (!this.getToken) {
        return null
      }

      const getInfo = await getUserInfo()
      const { roles = [], permissions = [], routes, user } = getInfo
      if (isArray(roles)) {
        const roleList = roles as string[]
        this.setRoleList(roleList)
      } else {
        getInfo.roles = []
        this.setRoleList([])
      }
      if (isArray(permissions)) {
        const permCodeList = permissions as string[]
        this.setPermCodeList(permCodeList)
      } else {
        getInfo.permissions = []
        this.setPermCodeList([])
      }
      const routePathMap = new Map(Object.entries(routes))
      if (isMap(routePathMap)) {
        this.setRoutePathMap(routePathMap)
      }
      this.setUserInfo(user)
      return getInfo
    },

    /**
     * @description: get enterprise info
     */
    async getEnterpriseInfoAction() {
      if (!this.getToken) return null
      const enterpriseInfo = (await getEnterpriseInfo()) as GetEnterpriseIM
      this.setEnterpriseInfo(enterpriseInfo)
    },

    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        await doLogout().catch(() => {
          console.log('??????Token??????')
        })
      }
      sessionStorage.removeItem(MODULE_CACHE)
      this.resetState()
      usePermissionStore().resetState()
      goLogin && router.push(PageEnum.BASE_LOGIN)
    },

    /**
     * @description: get code img
     */
    async getCodeImage() {
      return await getCodeImg()
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      const { t } = useI18n()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true)
        },
      })
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(pinia)
}
