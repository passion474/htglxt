import { OrganizeLM } from '@admin/types/modules/system'
import { defaultRequest } from '../../../request'

enum Api {
  ORGANIZE_SCOPE = '/system/organize/organizeScope',
  ORGANIZE_OPTION = '/system/organize/option',
}

/** 获取企业部门|岗位树 */
export const organizeScopeApi = () =>
  defaultRequest.get<OrganizeLM>({ url: Api.ORGANIZE_SCOPE })

/** 获取企业部门|岗位树 | 无部门叶子节点 */
export const organizeOptionApi = () =>
  defaultRequest.get<OrganizeLM>({ url: Api.ORGANIZE_OPTION })
