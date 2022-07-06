import { LAYOUT } from '@/router/constant'
import { t } from '@admin/locale'

const test: RouteRecordItem = {
  path: '/test',
  name: 'test',
  component: LAYOUT,
  redirect: '/test/testPage',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '测试平台',
  },
  children: [
    {
      path: 'testPage',
      name: 'testPage',
      component: () => import('@/views/test/testPage/index.vue'),
      meta: {
        affix: false,
        title: '测试页面',
      },
    }
  ],
}

export default test
