import { UserIM } from '@admin/types/modules/system'
import { defaultRequest } from '../../request'
import { RequestUploadFileOptions } from '@admin/types'
import { UploadIM } from '@admin/types/modules/sys'
import { context } from '../../_bridge'

enum Api {
  GET_USER_PROFILE = '/system/user/profile',
  UPDATE_USER_PROFILE = '/system/user/profile',
  RESET_USER_NAME = '/system/user/profile/userName',
  RESET_USER_PWD = '/system/user/profile/password',
  RESET_USER_PHONE = '/system/user/profile/phone',
  RESET_USER_EMAIL = '/system/user/profile/email',
  RESET_USER_AVATAR = '/system/user/profile/avatar',
}

/** 查询用户个人信息 */
export const getUserProfileApi = () =>
  defaultRequest.get<UserIM>({ url: Api.GET_USER_PROFILE })

/** 修改用户个人信息 */
export const editUserProfileApi = (params: UserIM) =>
  defaultRequest.put({ url: Api.UPDATE_USER_PROFILE, params })

/** 用户账号修改 */
export const resetUserNameApi = (userName: string) =>
  defaultRequest.put(
    {
      url: Api.RESET_USER_NAME,
      params: { userName },
    },
    { joinParamsToUrl: true },
  )

/** 密保手机绑定 */
export const resetUserPhoneApi = (phone: string) =>
  defaultRequest.put(
    {
      url: Api.RESET_USER_PHONE,
      params: { phone },
    },
    { joinParamsToUrl: true },
  )

/** 备用邮箱绑定 */
export const resetUserEmailApi = (email: string) =>
  defaultRequest.put(
    {
      url: Api.RESET_USER_EMAIL,
      params: { email },
    },
    { joinParamsToUrl: true },
  )

/** 密码重置 */
export const resetUserPwdApi = (oldPassword: string, newPassword: string) =>
  defaultRequest.put(
    {
      url: Api.RESET_USER_PWD,
      params: { oldPassword, newPassword },
    },
    { joinParamsToUrl: true },
  )

/** 用户头像上传 */
export const editAvatarApi = (
  params: RequestUploadFileOptions,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) =>
  defaultRequest.uploadFile<UploadIM>(
    {
      baseURL: context.uploadUrl,
      url: Api.RESET_USER_AVATAR,
      onUploadProgress,
    },
    params,
  )
