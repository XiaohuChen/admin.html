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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'example',
        affix: true
      }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/product',
    component: Layout,
    redirect: '/prodcut/list',
    meta: {
      title: '产品设置',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/product/list'),
        name: 'ProductList',
        meta: {
          title: '产品列表',
          icon: 'list',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/community',
    component: Layout,
    redirect: '/community/list',
    meta: {
      title: '社区等级',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/community/list'),
        name: 'CommunityList',
        meta: {
          title: '社区等级',
          icon: 'tree',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/plan',
    component: Layout,
    redirect: '/plan/list',
    meta: {
      title: '预约等级',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/plan/list'),
        name: 'PlanList',
        meta: {
          title: '预约等级',
          icon: 'tree-table',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/invite',
    meta: {
      title: '通用设置',
      icon: 'table'
    },
    children: [
      {
        path: 'invite',
        component: () => import('@/views/setting/invite'),
        name: 'Setting',
        meta: {
          title: '邀请奖励设置',
          icon: 'tree-table',
          noCache: true
        }
      },
      {
        path: 'world',
        component: () => import('@/views/setting/world'),
        name: 'Setting',
        meta: {
          title: '分红和回购设置',
          icon: 'tree-table',
          noCache: true
        }
      },
      {
        path: 'plan',
        component: () => import('@/views/setting/plan'),
        name: 'Setting',
        meta: {
          title: '预约设置',
          icon: 'tree-table',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/invest',
    component: Layout,
    redirect: '/invest/list',
    meta: {
      title: '通用设置',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/invest/list'),
        name: 'InvestList',
        meta: {
          title: '理财记录',
          icon: 'table',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/output',
    component: Layout,
    redirect: '/output/list',
    meta: {
      title: '收益记录',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/output/list'),
        name: 'OutputList',
        meta: {
          title: '收益记录',
          icon: 'table',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/list',
    meta: {
      title: '配置管理',
      icon: 'table'
    },
    children: [{
      path: 'list',
      component: () => import('@/views/config/list'),
      name: 'List',
      meta: {
        title: '七牛配置',
        icon: 'table',
        noCache: true
      }
    },
    {
      path: 'smsList',
      component: () => import('@/views/config/smsList'),
      name: 'smsList',
      meta: {
        title: '短信配置',
        icon: 'table',
        noCache: true
      }
    },
    {
      path: 'appList',
      component: () => import('@/views/config/appList'),
      name: 'appList',
      meta: {
        title: '版本配置',
        icon: 'table',
        noCache: true
      }
    }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/icons/index'),
      name: 'Icons',
      meta: {
        title: '图标',
        icon: 'icon',
        noCache: true
      }
    }]
  },
  {
    path: '/clipboard',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/clipboard/index'),
      name: 'ClipboardDemo',
      meta: {
        title: 'Clipboard',
        icon: 'clipboard'
      }
    }]
  },

  {
    path: '/rule',
    component: Layout,
    redirect: '/rule/list',
    meta: {
      title: '权限管理',
      icon: 'documentation'
    },
    children: [{
      path: 'list',
      component: () => import('@/views/role/list'),
      name: 'RoleList',
      meta: {
        title: '权限列表',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: 'group',
      component: () => import('@/views/role/group'),
      name: 'RoleGroup',
      meta: {
        title: '权限组',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: 'group/edit/:id',
      hidden: true,
      component: () => import('@/views/role/edit-group'),
      name: 'GroupEdit',
      meta: {
        title: '编辑权限组',
        icon: 'documentation',
        noCache: true
      }
    },
    {
      path: 'group/add',
      hidden: true,
      component: () => import('@/views/role/add-group'),
      name: 'GroupAdd',
      meta: {
        title: '添加权限组',
        icon: 'documentation',
        noCache: true
      }
    }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    meta: {
      title: '管理员管理',
      icon: 'user'
    },
    children: [{
      path: 'list',
      component: () => import('@/views/admin/list'),
      name: 'AdminList',
      meta: {
        title: '管理员列表',
        icon: 'user',
        noCache: true
      }
    },
    {
      path: 'adminLogList',
      component: () => import('@/views/admin/adminLogList'),
      name: 'adminLogList',
      meta: {
        title: '操作日志',
        icon: 'user',
        noCache: true
      }
    }
    ]
  },

  {
    path: '/coin',
    component: Layout,
    redirect: '/coin/coinList',
    meta: {
      title: '币种管理',
      icon: 'money'
    },
    children: [{
      path: 'coinList',
      component: () => import('@/views/coin/coinList'),
      name: 'coinList',
      meta: {
        title: '币种列表',
        icon: 'money',
        noCache: true
      }
    },
    {
      path: 'rechargeList',
      component: () => import('@/views/coin/rechargeList'),
      name: 'rechargeList',
      meta: {
        title: '转入记录',
        icon: 'money',
        noCache: true
      }
    },
    {
      path: 'withdrawList',
      component: () => import('@/views/coin/withdrawList'),
      name: 'withdrawList',
      meta: {
        title: '转出记录',
        icon: 'money',
        noCache: true
      }
    },
    {
      path: 'financingList',
      component: () => import('@/views/coin/financingList'),
      name: 'financingList',
      meta: {
        title: '资金流水',
        icon: 'money',
        noCache: true
      }
    }
    ]
  }, {
    path: '/members',
    component: Layout,
    redirect: '/members/list',
    meta: {
      title: '会员管理',
      icon: 'peoples'
    },
    children: [{
      path: 'list',
      component: () => import('@/views/members/list'),
      name: 'MemberList',
      meta: {
        title: '会员列表',
        icon: 'peoples',
        noCache: true
      }
    }]
  },
  {
    path: '/bannerNotice',
    component: Layout,
    redirect: '/bannerNotice/bannerList',
    meta: {
      title: '广告管理',
      icon: 'example'
    },
    children: [{
      path: 'bannerList',
      component: () => import('@/views/banner/list'),
      name: 'bannerList',
      meta: {
        title: 'banner列表',
        icon: 'example',
        noCache: true
      }
    },
    {
      path: 'noticeList',
      component: () => import('@/views/notice/list'),
      name: 'noticeList',
      meta: {
        title: '公告列表',
        icon: 'example',
        noCache: true
      }
    }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
