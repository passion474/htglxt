import { defaultRequest } from '../../../request'
import {
  GenCodeLM,
  GenTableColumnLRM,
  GenTableIM,
  GenTableLRM,
  GenTablePPM,
} from '@admin/types/modules/gen'

enum Api {
  LIST_GEN = '/code/gen/list',
  LIST_DB_GEN = '/code/gen/db/list',
  LIST_GEN_COLUMN = '/code/gen/column/',
  PREVIEW_GEN = '/code/gen/preview/',
  DOWNLOAD_GEN = '/code/gen/download/',
  GENERATE_GEN = '/code/gen/generate/',
  GET_GEN = '/code/gen/',
  GET_SUB_GEN = '/code/gen/sub/',
  IMPORT_DB_GEN = '/code/gen/importTable',
  EDIT_GEN = '/code/gen',
  DEL_BATCH_FORCE_DEPT = '/code/gen/batch/force/',
}

/** 查询业务表列表 */
export const listGenApi = (params?: GenTablePPM) =>
  defaultRequest.get<GenTableLRM>({ url: Api.LIST_GEN, params })

/** 查询生成表的字段列表 */
export const listGenColumnApi = (tableId: string | number) =>
  defaultRequest.get<GenTableColumnLRM>({
    url: Api.LIST_GEN_COLUMN,
    params: tableId,
  })

/** 查询数据库表列表 */
export const listDBGenApi = (params?: GenTablePPM) =>
  defaultRequest.get<GenTableLRM>({ url: Api.LIST_DB_GEN, params })

/** 查询生成表配置详细 */
export const getGenApi = (id: string | number) =>
  defaultRequest.get<GenTableIM>({ url: Api.GET_GEN, params: id })

/** 查询生成表配置详细 | 带子数据 */
export const getSubGenApi = (id: string | number) =>
  defaultRequest.get<GenTableIM>({ url: Api.GET_SUB_GEN, params: id })

/** 预览代码 */
export const previewGenApi = (tableId: string | number) =>
  defaultRequest.get<GenCodeLM>({ url: Api.PREVIEW_GEN, params: tableId })

/** 生成代码（下载方式） */
export const downloadGenApi = async (tableId: string | number, title: string) =>
  defaultRequest.download<any>(
    { url: Api.DOWNLOAD_GEN, params: tableId },
    title,
  )

/** 生成代码（自定义路径） */
export const generateGenApi = (tableId: string | number) =>
  defaultRequest.get<GenCodeLM>({ url: Api.GENERATE_GEN, params: tableId })

/** 导入数据表 */
export const importDBGenApi = (names: (string | number)[]) =>
  defaultRequest.post(
    {
      url: Api.IMPORT_DB_GEN,
      params: { tables: names.toString() },
    },
    { joinParamsToUrl: true },
  )

/** 修改数据表 */
export const editGenApi = (params: GenTableIM) =>
  defaultRequest.put({ url: Api.EDIT_GEN, params })

/** 强制删除业务表 */
export const delForceGenApi = (ids: (string | number) | (string | number)[]) =>
  defaultRequest.delete({
    url: Api.DEL_BATCH_FORCE_DEPT,
    params: ids.toString(),
  })
