import { defaultRequest } from '../../request'
import { GetMenuLM } from '@admin/types/modules/sys'
import { ModuleLM } from '@admin/types/modules/system'

enum Api {
  GetMenuList = '/system/menu/getRouters/',
  GetModuleList = '/system/module/getRouters',
}

/**
 * @description: Get user menu based on id
 */
export const getMenuList = (moduleId: string) => {
  return defaultRequest.get<GetMenuLM>({
    url: Api.GetMenuList,
    params: moduleId,
  })
}

/**
 * @description: Get user module based
 */
export const getModuleList = () => {
  return defaultRequest.get<ModuleLM>({
    url: Api.GetModuleList,
  })
}
