import type { LockInfo } from '@admin/types'

import { defineStore } from 'pinia'
import { useUserStore } from '@/store/user'

interface LockState {
  lockInfo: Nullable<LockInfo>
}

export const useLockStore = defineStore({
  id: 'app-lock',
  persist: {
    strategies: [
      {
        paths: ['lockInfo'],
      },
    ],
  },
  state: (): LockState => ({
    lockInfo: {},
  }),
  getters: {
    getLockInfo(): Nullable<LockInfo> {
      return this.lockInfo
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info)
    },
    resetLockInfo() {
      this.lockInfo = null
    },
    // Unlock
    async unLock(password?: string) {
      const userStore = useUserStore()
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo()
        return true
      }
      const tryLogin = async () => {
        try {
          const enterpriseName = userStore.getEnterpriseInfo?.name
          const userName = userStore.getUserInfo?.userName
          const res = await userStore.login({
            code: '',
            uuid: '',
            enterpriseName: enterpriseName,
            userName: userName,
            password: password!,
            goHome: false,
            mode: 'none',
          })
          if (res) {
            this.resetLockInfo()
          }
          return res
        } catch (error) {
          return false
        }
      }
      return await tryLogin()
    },
  },
})
