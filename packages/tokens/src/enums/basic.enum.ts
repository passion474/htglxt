export enum ContentLayoutEnum {
  // auto width
  FULL = 'full',
  // fixed width
  FIXED = 'fixed',
}

// menu theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // role
  ROLE = 'ROLE',
  // black
  BACK = 'BACK',
  // backstage and reception route
  LINK = 'LINK',
  // route mapping
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

// tenant type enum
export enum TenantTypeEnum {
  // 租管租户
  ADMIN = 'Y',
  // 普通租户
  NORMAL = 'N',
}

// user type enum
export enum UserTypeEnum {
  // 超管用户
  ADMIN = '00',
  // 普通用户
  NORMAL = '01',
}

export enum PermEnum {
  // super admin
  ADMIN = '*:*:*',
}

export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/dashboard',
  // userCenter path
  USER_CENTER = '/userCenter',
  // enterpriseCenter path
  ENTERPRISE_CENTER = '/enterpriseCenter',
  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list',
}

export enum DescItemSizeEnum {
  DEFAULT = 24,
  SMALL = 12,
}

export enum ComponentSizeEnum {
  DEFAULT = 'default',
  SMALL = 'small',
  LARGE = 'large',
}

export enum ComponentSizeValueEnum {
  DEFAULT = 48,
  SMALL = 16,
  LARGE = 64,
}

export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise',
}

// icon enum
export enum IconEnum {
  VIEW = 'ant-design:file-search-outlined',
  ADD = 'ant-design:plus-outlined',
  IMPORT = 'ant-design:vertical-align-top-outlined',
  EXPORT = 'ant-design:vertical-align-bottom-outlined',
  EDIT = 'clarity:note-edit-line',
  AUTH = 'ant-design:safety-certificate-outlined',
  DATA = 'clarity:note-edit-line',
  DELETE = 'ant-design:delete-outlined',
  SEARCH = 'ant-design:search-outlined',
  RESET = 'ant-design:sync-outlined',
  UPLOAD = 'ant-design:cloud-upload-outlined',
  DOWNLOAD = 'ant-design:cloud-download-outlined',
  PREVIEW = 'ant-design:eye-outlined',
  ADD_FOLD = 'ant-design:folder-add-outlined',
  LOG = 'ant-design:exception-outlined',
  PASSWORD = 'ant-design:key-outlined',
}

// color enum
export enum ColorEnum {
  PINK = 'pink',
  RED = 'red',
  ORANGE = 'orange',
  GREEN = 'green',
  CYAN = 'cyan',
  BLUE = 'blue',
  PURPLE = 'purple',
}
