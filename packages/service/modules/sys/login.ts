import { defaultRequest } from '../../request'
import { ErrorMessageMode } from '@admin/types'
import {
  CodeImgIM,
  GetEnterpriseIM,
  GetUserIM,
  LoginIM,
  LoginPM,
} from '@admin/types/modules/sys'

enum Api {
  GetCodeImg = '/code',
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/system/user/getInfo',
  GetEnterpriseInfo = '/system/enterprise/getInfo',
}

/**
 * @description: code img api
 */
export function getCodeImg() {
  return defaultRequest.get<CodeImgIM>(
    { url: Api.GetCodeImg, timeout: 20000 },
    { errorMessageMode: 'none', withToken: false },
  )
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginPM, mode: ErrorMessageMode = 'modal') {
  return defaultRequest.post<LoginIM>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
      withToken: false,
    },
  )
}

/**
 * @description: get user info
 */
export function getUserInfo() {
  return defaultRequest.get<GetUserIM>(
    { url: Api.GetUserInfo },
    { errorMessageMode: 'none' },
  )
}

/**
 * @description: get enterprise info
 */
export function getEnterpriseInfo() {
  return defaultRequest.get<GetEnterpriseIM>(
    { url: Api.GetEnterpriseInfo },
    { errorMessageMode: 'none' },
  )
}

/**
 * @description: login out
 */
export function doLogout() {
  return defaultRequest.delete({ url: Api.Logout })
}
