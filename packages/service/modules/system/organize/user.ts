import { UserIM, UserLRM, UserPM, UserPPM } from '@admin/types/modules/system'
import { defaultRequest } from '../../../request'
import { formatToDateTime } from '@admin/utils'

enum Api {
  LIST_USER = '/system/user/list',
  OPTION_USER = '/system/user/option',
  GET_USER = '/system/user/',
  GET_AUTH_USER = '/system/user/auth/',
  ADD_USER = '/system/user',
  EDIT_USER = '/system/user',
  EDIT_AUTH_USER = '/system/user/auth',
  EDIT_STATUS_USER = '/system/user/status',
  DEL_BATCH_USER = '/system/user/batch/',
  EXPORT_USER = '/system/user/export',
  RESET_USER_PWD = '/system/user/resetPwd',
}

/** 查询用户列表 */
export const listUserApi = (params?: UserPPM) =>
  defaultRequest.get<UserLRM>({ url: Api.LIST_USER, params })

/** 查询用户选择框列表 */
export const optionUserApi = () =>
  defaultRequest.get<UserLRM>({ url: Api.OPTION_USER })

/** 查询用户详细 */
export const getUserApi = (id: string | number) =>
  defaultRequest.get<UserIM>({ url: Api.GET_USER, params: id })

/** 查询用户的角色权限节点集 */
export const getAuthUserApi = (id: string | number) =>
  defaultRequest.get<(string | number)[]>({
    url: Api.GET_AUTH_USER,
    params: id,
  })

/** 新增用户 */
export const addUserApi = (params: UserIM) =>
  defaultRequest.post({ url: Api.ADD_USER, params })

/** 修改用户 */
export const editUserApi = (params: UserIM) =>
  defaultRequest.put({ url: Api.EDIT_USER, params })

/** 修改用户的角色权限 */
export const editAuthUserScopeApi = (
  id: string | number,
  roleIds: (string | number)[],
) =>
  defaultRequest.put({
    url: Api.EDIT_AUTH_USER,
    params: { id: id, roleIds: roleIds },
  })

/** 修改用户状态 */
export const editStatusUserApi = (id: string | number, status: any) =>
  defaultRequest.put({
    url: Api.EDIT_STATUS_USER,
    params: { id: id, status: status },
  })

/** 删除用户 */
export const delUserApi = (ids: (string | number) | (string | number)[]) =>
  defaultRequest.delete({ url: Api.DEL_BATCH_USER, params: ids.toString() })

/** 用户导出 */
export const exportUserApi = async (params: UserPM) =>
  defaultRequest.export<any>(
    { url: Api.EXPORT_USER, params: params },
    '用户_' + formatToDateTime(new Date()) + '.xlsx',
  )

/** 用户密码重置 */
export const resetUserPwdApi = (id: string | number, password: string) =>
  defaultRequest.put({
    url: Api.RESET_USER_PWD,
    params: { id: id, password: password },
  })
