import { LoginLogPPM, LoginLogLRM } from '@admin/types/modules/system'
import { defaultRequest } from '../../../request'

enum Api {
  LIST_LOGIN_LOG = '/system/loginLog/list',
  DEL_BATCH_LOGIN_LOG = '/system/loginLog/batch/',
  CLEAN_LOGIN_LOG = '/system/loginLog/clean',
}

/** 查询系统访问记录列表 */
export const listLoginLogApi = (params?: LoginLogPPM) =>
  defaultRequest.get<LoginLogLRM>({ url: Api.LIST_LOGIN_LOG, params })

/** 删除系统访问记录 */
export const delLoginLogApi = (ids: (string | number) | (string | number)[]) =>
  defaultRequest.delete({
    url: Api.DEL_BATCH_LOGIN_LOG,
    params: ids.toString(),
  })

/** 清空系统访问记录 */
export const cleanLoginLogApi = () =>
  defaultRequest.delete({ url: Api.CLEAN_LOGIN_LOG })
