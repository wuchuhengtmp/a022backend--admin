import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制面板', icon: 'dashboard' }
    }]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/group',
    name: 'Example',
    meta: { title: '会员管理', icon: 'user' },
    children: [
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/users/group'),
        meta: { title: '会员等级', icon: 'level' }
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/users/index'),
        meta: { title: '会员列表', icon: 'user' }
      },
      {
        path: 'certification',
        name: 'certification',
        component: () => import('@/views/users/certification'),
        meta: { title: '认证审核', icon: 'certification' }
      },
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/users/organization'),
        meta: { title: '工会等级', icon: 'organization' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/index',
    meta: { title: ' 矿机管理', icon: 'store' },
    children: [
      {
        path: 'index',
        name: 'goods',
        component: () => import('@/views/goods/miner'),
        meta: { title: '矿机列表', icon: 'miner' }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/goods/order'),
        meta: { title: '已购买列表', icon: 'store' }
      }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/logs',
    meta: { title: '资金管理', icon: 'revenue' },
    children: [
      {
        path: 'logs',
        name: 'logs',
        component: () => import('@/views/revenue/logs'),
        meta: { title: '收支记录', icon: 'log' }
      }
    ]
  },
  {
    path: '/transation',
    name: 'transation',
    component: Layout,
    meta: { title: '交易所', icon: 'transation' },
    redirect: '/transation/paying',
    children: [
      {
        path: 'buying',
        name: 'paying',
        component: () => import('@/views/transation/paying'),
        meta: { title: '求购订单', icon: 'transation' }
      },
      {
        path: 'pendingPayment',
        name: 'pendingPayment',
        component: () => import('@/views/transation/pendingPayment'),
        meta: { title: '买家待付款订单', icon: 'payer' }
      },
      {
        path: 'toBeConfirmedOrder',
        name: 'toBeConfirmedOrder',
        component: () => import('@/views/transation/toBeConfirmedOrder'),
        meta: { title: '待确认订单', icon: 'toBeConfirm' }
      },
      {
        path: 'completedorder',
        name: 'completedorder',
        component: () => import('@/views/transation/completedOrder'),
        meta: { title: '已完成订单', icon: 'complete' }
      },
      {
        path: 'complant',
        name: 'complaint',
        component: () => import('@/views/transation/complant'),
        meta: { title: '申诉订单', icon: 'complaint' }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: { title: '系统设置', icon: 'system' },
    redirect: '/system/notice',
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/system/notice'),
        meta: { title: '公告设置', icon: 'notice' }
      },
      {
        path: 'transaction',
        name: 'transaction',
        component: () => import('@/views/system/transaction'),
        meta: { title: '交易设置', icon: 'transation' }
      },
      {
        path: 'rules',
        name: 'rules',
        component: () => import('@/views/system/rules'),
        meta: { title: '规则说明设置', icon: 'rules' }
      },
      {
        path: 'sign',
        name: 'sign',
        component: () => import('@/views/system/sign'),
        meta: { title: '签到设置', icon: 'sign' }
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
