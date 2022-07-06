import { LAYOUT } from '@/router/constant'
import { t } from '@admin/locale'
// dashboard: '首页',
// workbench: '工作台',
// analysis: '分析页',
const dashboard: RouteRecordItem = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  //点开首页后自动指向分析页
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        affix: false,
        title: t('routes.dashboard.analysis'),
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        affix: true,
        title: t('routes.dashboard.workbench'),
      },
    },
  ],
}

export default dashboard
