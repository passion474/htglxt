import { ModuleIM, ModulePPM, ModuleLRM } from '@admin/types/modules/system'
import { defaultRequest } from '../../../request'

enum Api {
  LIST_MODULE = '/system/module/list',
  OPTION_MODULE = '/system/module/option',
  GET_MODULE = '/system/module/',
  ADD_MODULE = '/system/module',
  EDIT_MODULE = '/system/module',
  EDIT_STATUS_MODULE = '/system/module/status',
  DEL_BATCH_MODULE = '/system/module/batch/',
}

/** 查询模块列表 */
export const listModuleApi = (params?: ModulePPM) =>
  defaultRequest.get<ModuleLRM>({ url: Api.LIST_MODULE, params })

/** 查询模块选择框列表 */
export const optionModuleApi = () =>
  defaultRequest.get<ModuleLRM>({ url: Api.OPTION_MODULE })

/** 查询模块详细 */
export const getModuleApi = (id: string | number) =>
  defaultRequest.get<ModuleIM>({ url: Api.GET_MODULE, params: id })

/** 新增模块 */
export const addModuleApi = (params: ModuleIM) =>
  defaultRequest.post({ url: Api.ADD_MODULE, params })

/** 修改模块 */
export const editModuleApi = (params: ModuleIM) =>
  defaultRequest.put({ url: Api.EDIT_MODULE, params })

/** 修改模块状态 */
export const editStatusModuleApi = (id: string | number, status: any) =>
  defaultRequest.put({
    url: Api.EDIT_STATUS_MODULE,
    params: { id: id, status: status },
  })

/** 删除模块 */
export const delModuleApi = (ids: (string | number) | (string | number)[]) =>
  defaultRequest.delete({ url: Api.DEL_BATCH_MODULE, params: ids.toString() })
