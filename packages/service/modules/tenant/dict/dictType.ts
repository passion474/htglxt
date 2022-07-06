import { defaultRequest } from '../../../request'
import {
  DictTypeIM,
  DictTypeLRM,
  DictTypePPM,
} from '@admin/types/modules/tenant'

enum Api {
  LIST_DICT_TYPE = '/system/dict/type/list',
  OPTION_DICT_TYPE = '/system/dict/type/option',
  GET_DICT_TYPE = '/system/dict/type/',
  ADD_DICT_TYPE = '/system/dict/type',
  EDIT_DICT_TYPE = '/system/dict/type',
  EDIT_STATUS_DICT_TYPE = '/system/dict/type/status',
  DEL_BATCH_DICT_TYPE = '/system/dict/type/batch/',
  REFRESH_DICT = '/system/dict/type/refresh',
}

/** 查询字典类型列表 */
export const listDictTypeApi = (params?: DictTypePPM) =>
  defaultRequest.get<DictTypeLRM>({ url: Api.LIST_DICT_TYPE, params })

/** 查询字典类型选择框列表 */
export const optionDictTypeApi = () =>
  defaultRequest.get<DictTypeLRM>({ url: Api.OPTION_DICT_TYPE })

/** 查询字典类型详细 */
export const getDictTypeApi = (id: string | number) =>
  defaultRequest.get<DictTypeIM>({ url: Api.GET_DICT_TYPE, params: id })

/** 新增字典类型 */
export const addDictTypeApi = (params: DictTypeIM) =>
  defaultRequest.post({ url: Api.ADD_DICT_TYPE, params })

/** 修改字典类型 */
export const editDictTypeApi = (params: DictTypeIM) =>
  defaultRequest.put({ url: Api.EDIT_DICT_TYPE, params })

/** 修改字典类型状态 */
export const editStatusDictTypeApi = (id: string | number, status: any) =>
  defaultRequest.put({
    url: Api.EDIT_STATUS_DICT_TYPE,
    params: { id: id, status: status },
  })

/** 删除字典类型 */
export const delDictTypeApi = (ids: (string | number)[]) =>
  defaultRequest.delete({
    url: Api.DEL_BATCH_DICT_TYPE,
    params: ids.toString(),
  })

/** 刷新字典缓存 */
export const refreshDictApi = () =>
  defaultRequest.get({ url: Api.REFRESH_DICT })
