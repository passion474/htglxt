import { REDIRECT_NAME, PAGE_NOT_FOUND_NAME } from '@admin/tokens'
import { LAYOUT } from '@/router/constant'

export const EXCEPTION_COMPONENT = () =>
  import('@/views/sys/exception/Exception.vue')

// 404 on a page，通過获得的不同错误码跳转到异常页面
export const PAGE_NOT_FOUND_ROUTE: RouteRecordItem = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    //隐藏面包屑导航
    hideBreadcrumb: true,
    //菜单中隐藏
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
}
// 重定向一开始是后台的定义，比如说我在主页面，但是因为停留的时间过长，登录过期了，这个时候我再去发送一个请求的时候，后台发现登录过期了，
// 就需要重定向到登录页面。于是后台就会在请求头中带上重定向的字段，浏览器检测到后，就会再次向后台服务发送请求，请求登录页。
export const REDIRECT_ROUTE: RouteRecordItem = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/views/sys/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
}
