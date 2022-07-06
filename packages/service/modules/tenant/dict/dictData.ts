import { defaultRequest } from '../../../request'
import {
  DictDataIM,
  DictDataLRM,
  DictDataPPM,
} from '@admin/types/modules/tenant'

enum Api {
  LIST_DICT_DATA = '/system/dict/data/list',
  GET_DICT_DATA = '/system/dict/data/',
  ADD_DICT_DATA = '/system/dict/data',
  EDIT_DICT_DATA = '/system/dict/data',
  EDIT_STATUS_DICT_DATA = '/system/dict/data/status',
  DEL_BATCH_DICT_DATA = '/system/dict/data/batch/',
}

/** 查询字典数据列表 */
export const listDictDataApi = (params?: DictDataPPM) =>
  defaultRequest.get<DictDataLRM>({ url: Api.LIST_DICT_DATA, params })

/** 查询字典数据详细 */
export const getDictDataApi = (id: string | number) =>
  defaultRequest.get<DictDataIM>({ url: Api.GET_DICT_DATA, params: id })

/** 新增字典数据 */
export const addDictDataApi = (params: DictDataIM) =>
  defaultRequest.post({ url: Api.ADD_DICT_DATA, params })

/** 修改字典数据 */
export const editDictDataApi = (params: DictDataIM) =>
  defaultRequest.put({ url: Api.EDIT_DICT_DATA, params })

/** 修改字典数据状态 */
export const editStatusDictDataApi = (id: string | number, status: any) =>
  defaultRequest.put({
    url: Api.EDIT_STATUS_DICT_DATA,
    params: { id: id, status: status },
  })

/** 删除字典数据 */
export const delDictDataApi = (ids: (string | number)[]) =>
  defaultRequest.delete({
    url: Api.DEL_BATCH_DICT_DATA,
    params: ids.toString(),
  })
