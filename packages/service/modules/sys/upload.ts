import { defaultRequest } from '../../request'
import { context } from '../../_bridge'
import { RequestUploadFileOptions } from '@admin/types'
import { UploadIM } from '@admin/types/modules/sys'

enum Api {
  UPLOAD_FILE = '/file/upload',
}

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: RequestUploadFileOptions,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defaultRequest.uploadFile<UploadIM>(
    {
      url: context.uploadUrl,
      onUploadProgress,
    },
    params,
  )
}

/** 文件上传 */
export const fileUploadApi = (
  params: RequestUploadFileOptions,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) =>
  defaultRequest.uploadFile<UploadIM>(
    {
      baseURL: context.uploadUrl,
      url: Api.UPLOAD_FILE,
      onUploadProgress,
    },
    params,
  )
