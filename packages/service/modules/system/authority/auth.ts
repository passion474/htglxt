import { AuthLM } from '@admin/types/modules/system'
import { defaultRequest } from '../../../request'

enum Api {
  AUTH_SCOPE_ENTERPRISE = '/system/auth/enterprise/authScope',
}

/** 查询企业权限范围树 */
export const authScopeEnterpriseApi = () =>
  defaultRequest.get<AuthLM>({ url: Api.AUTH_SCOPE_ENTERPRISE })
