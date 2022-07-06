import { LAYOUT } from '@/router/constant'
import { t } from '@admin/locale'

const test: RouteRecordItem = {
  // 记录的路径。
  path: '/griddemo',
  // 路由记录独一无二的名称。
  name: 'griddemo',
  // 对应的组件模板
  component: LAYOUT,
  // 刚进入应用都是进入到“/”这个路由的，直接进入到griddemoPage重定向
  redirect: '/griddemo/griddemoPage',
  // 路由元信息，在记录上附加自定义数据。
  meta: {
    //左边栏的排序
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '人员管理',
  },
  children: [
    {
      path: 'griddemoPage',
      name: 'griddemoPage',
      component: () => import('@/views/griddemo/griddemoPage/index.vue'),
      meta: {
        // 固钉
        affix: false,
        title: '人员管理表',
      },
    }
  ],
}

export default test
