import { defaultRequest } from '../../request'
import { DictLM } from '@admin/types/modules/sys'

enum Api {
  DIC_CONFIG = '/system/config/code/',
  DICT = '/system/dict/data/type/',
  DICT_LIST = '/system/dict/data/types/',
}

/** 参数查询 */
export const dicConfig = (params: string) =>
  defaultRequest.get<string>({ url: Api.DIC_CONFIG, params })

/** 字典查询 */
export const dicDict = (params: string) =>
  defaultRequest.get<DictLM>({ url: Api.DICT, params })

/** 字典批量查询 */
export const dicDictList = (dictCodeList: string[]) =>
  defaultRequest.get<Map<string, DictLM>>({
    url: Api.DICT_LIST,
    params: dictCodeList.toString(),
  })
