import {
  OperateLogIM,
  OperateLogPPM,
  OperateLogLRM,
} from '@admin/types/modules/system'
import { defaultRequest } from '../../../request'

enum Api {
  LIST_OPERATE_LOG = '/system/operateLog/list',
  GET_OPERATE_LOG = '/system/operateLog/',
  DEL_BATCH_OPERATE_LOG = '/system/operateLog/batch/',
  CLEAN_OPERATE_LOG = '/system/operateLog/clean',
}

/** 查询操作日志列表 */
export const listOperateLogApi = (params?: OperateLogPPM) =>
  defaultRequest.get<OperateLogLRM>({ url: Api.LIST_OPERATE_LOG, params })

/** 查询操作日志详细 */
export const getOperateLogApi = (id: string | number) =>
  defaultRequest.get<OperateLogIM>({ url: Api.GET_OPERATE_LOG, params: id })

/** 删除操作日志 */
export const delOperateLogApi = (
  ids: (string | number) | (string | number)[],
) =>
  defaultRequest.delete({
    url: Api.DEL_BATCH_OPERATE_LOG,
    params: ids.toString(),
  })

/** 清空操作日志 */
export const cleanOperateLogApi = () =>
  defaultRequest.delete({ url: Api.CLEAN_OPERATE_LOG })
