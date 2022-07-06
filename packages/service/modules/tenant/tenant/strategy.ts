import {
  StrategyIM,
  StrategyPPM,
  StrategyLRM,
} from '@admin/types/modules/tenant'
import { defaultRequest } from '../../../request'

enum Api {
  LIST_STRATEGY = '/tenant/strategy/list',
  OPTION_STRATEGY = '/tenant/strategy/option',
  GET_STRATEGY = '/tenant/strategy/',
  ADD_STRATEGY = '/tenant/strategy',
  EDIT_STRATEGY = '/tenant/strategy',
  EDIT_STATUS_STRATEGY = '/tenant/strategy/status',
  DEL_BATCH_STRATEGY = '/tenant/strategy/batch/',
}

/** 查询数据源策略列表 */
export const listStrategyApi = (params?: StrategyPPM) =>
  defaultRequest.get<StrategyLRM>({ url: Api.LIST_STRATEGY, params })

/** 查询源策略选择框列表 */
export const optionStrategyApi = () =>
  defaultRequest.get<StrategyLRM>({ url: Api.OPTION_STRATEGY })

/** 查询数据源策略详细 */
export const getStrategyApi = (id: string | number) =>
  defaultRequest.get<StrategyIM>({ url: Api.GET_STRATEGY, params: id })

/** 新增数据源策略 */
export const addStrategyApi = (params: StrategyIM) =>
  defaultRequest.post({ url: Api.ADD_STRATEGY, params })

/** 修改数据源策略 */
export const editStrategyApi = (params: StrategyIM) =>
  defaultRequest.put({ url: Api.EDIT_STRATEGY, params })

/** 修改数据源策略状态 */
export const editStatusStrategyApi = (id: string | number, status: any) =>
  defaultRequest.put({
    url: Api.EDIT_STATUS_STRATEGY,
    params: { id: id, status: status },
  })

/** 删除数据源策略 */
export const delStrategyApi = (ids: (string | number) | (string | number)[]) =>
  defaultRequest.delete({ url: Api.DEL_BATCH_STRATEGY, params: ids.toString() })
